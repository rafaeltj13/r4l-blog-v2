<script setup lang="ts">
import { posts } from "~/utils/postsData";

const route = useRoute();
const { t, locale } = useI18n();
const dateLocale = computed(() => (locale.value === "pt-BR" ? "pt-BR" : "en-US"));
const post = computed(() => posts.find((item) => item.id === route.params.id));

if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
        fatal: true,
    });
}

useSeoMeta({
    title: () => `R4L - ${post.value?.title ?? "Blog Post"}`,
    description: () => post.value?.content,
    ogTitle: () => post.value?.title,
    ogDescription: () => post.value?.content,
});

const readingTime = computed(() => {
    const text = post.value?.htmlContent.replace(/<[^>]*>/g, " ") ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
});

const currentIndex = computed(() =>
    posts.findIndex((item) => item.id === route.params.id),
);
const olderPost = computed(() =>
    currentIndex.value > 0 ? posts[currentIndex.value - 1] : null,
);
const newerPost = computed(() =>
    currentIndex.value < posts.length - 1 ? posts[currentIndex.value + 1] : null,
);

const formatDate = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(dateLocale.value, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

// Older entries are already structured HTML. This gives plain-text entries the
// same readable paragraph rhythm without rewriting the source post data.
const articleHtml = computed(() => {
    const source = post.value?.htmlContent.trim() ?? "";

    if (/<(?:article|p|h[1-6]|section|ul|ol|blockquote)\b/i.test(source)) {
        return source;
    }

    const text = source
        .replace(/^<div[^>]*>/i, "")
        .replace(/<\/div>$/i, "")
        .trim();

    return text
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => {
            const lines = block.split(/\n/).map((line) => line.trim()).filter(Boolean);
            const isNumberedList = lines.length > 0 && lines.every((line) => /^\d+\.\s/.test(line));

            const withLinks = (value: string) =>
                value.replace(
                    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
                    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
                );

            if (isNumberedList) {
                const items = lines
                    .map((line) => line.replace(/^\d+\.\s*/, ""))
                    .map((line) => `<li>${withLinks(line)}</li>`)
                    .join("");
                return `<ol>${items}</ol>`;
            }

            return `<p>${withLinks(lines.join(" "))}</p>`;
        })
        .join("");
});

const readingProgress = ref(0);
const shareStatus = ref<"idle" | "copied" | "error">("idle");
const shareLabel = computed(() =>
    shareStatus.value === "copied"
        ? t("post.linkCopied")
        : shareStatus.value === "error"
            ? t("post.tryAgain")
            : t("post.share"),
);

let shareResetTimer: ReturnType<typeof setTimeout> | undefined;
const resetShareStatus = () => {
    shareResetTimer = setTimeout(() => (shareStatus.value = "idle"), 1800);
};

const sharePost = async () => {
    if (!import.meta.client || !post.value) return;

    const shareData = {
        title: post.value.title,
        text: post.value.content,
        url: window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            return;
        }

        await navigator.clipboard.writeText(shareData.url);
        shareStatus.value = "copied";
        clearTimeout(shareResetTimer);
        resetShareStatus();
    } catch (error) {
        if ((error as DOMException).name !== "AbortError") {
            shareStatus.value = "error";
            clearTimeout(shareResetTimer);
            resetShareStatus();
        }
    }
};

onMounted(() => {
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        readingProgress.value = pageHeight > 0
            ? Math.min(100, Math.round((scrollTop / pageHeight) * 100))
            : 0;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    onUnmounted(() => window.removeEventListener("scroll", updateProgress));
});
</script>

<template>
    <div>
        <div class="fixed inset-x-0 top-14 z-40 h-px" aria-hidden="true">
            <div
                class="h-full bg-primary/70 transition-[width] duration-150 ease-out"
                :style="{ width: `${readingProgress}%` }"
            />
        </div>

        <article class="mx-auto max-w-2xl px-5 pb-24 pt-10 sm:px-6 sm:pt-16">
            <NuxtLink
                to="/posts"
                class="inline-flex items-center gap-1.5 text-sm text-base-content/50 transition-colors hover:text-base-content"
            >
                <Icon name="uil:arrow-left" class="size-4" />
                {{ $t("post.allWriting") }}
            </NuxtLink>

            <header class="mt-10 sm:mt-14">
                <h1 class="text-3xl leading-tight text-base-content sm:text-4xl">
                    {{ post!.title }}
                </h1>
                <p class="mt-5 text-lg leading-relaxed text-base-content/60">
                    {{ post!.content }}
                </p>

                <div class="mt-8 flex items-center justify-between gap-4 text-sm text-base-content/50">
                    <p>
                        <time :datetime="post!.date">{{ formatDate(post!.date) }}</time>
                        <span aria-hidden="true"> · </span>
                        {{ $t("post.minRead", { count: readingTime }) }}
                    </p>
                    <button
                        type="button"
                        class="inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-base-content"
                        :aria-label="shareLabel"
                        @click="sharePost"
                    >
                        <Icon name="uil:share-alt" class="size-4" />
                        <span aria-live="polite">{{ shareLabel }}</span>
                    </button>
                </div>
            </header>

            <figure class="mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-base-200 sm:-mx-8 sm:mt-10">
                <PostsPostImage variant="hero" :post="post!" />
            </figure>

            <div class="post-content mt-12 sm:mt-14">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="articleHtml" />
            </div>

            <nav
                v-if="olderPost || newerPost"
                class="mt-20 grid gap-8 border-t border-base-content/10 pt-8 sm:grid-cols-2"
                aria-label="Post navigation"
            >
                <NuxtLink v-if="olderPost" :to="`/posts/${olderPost.id}`" class="group">
                    <span class="text-sm text-base-content/45">← {{ $t("post.older") }}</span>
                    <span class="mt-1 block font-semibold leading-snug text-base-content transition-colors group-hover:text-primary">
                        {{ olderPost.title }}
                    </span>
                </NuxtLink>
                <span v-else class="hidden sm:block" />

                <NuxtLink
                    v-if="newerPost"
                    :to="`/posts/${newerPost.id}`"
                    class="group sm:text-right"
                >
                    <span class="text-sm text-base-content/45">{{ $t("post.newer") }} →</span>
                    <span class="mt-1 block font-semibold leading-snug text-base-content transition-colors group-hover:text-primary">
                        {{ newerPost.title }}
                    </span>
                </NuxtLink>
            </nav>
        </article>
    </div>
</template>
