<script setup lang="ts">
import { posts } from "~/utils/postsData";

const route = useRoute();
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
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
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
const shareLabel = ref("Share");

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
        shareLabel.value = "Link copied";
        window.setTimeout(() => (shareLabel.value = "Share"), 1800);
    } catch (error) {
        if ((error as DOMException).name !== "AbortError") {
            shareLabel.value = "Try again";
            window.setTimeout(() => (shareLabel.value = "Share"), 1800);
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
        <div class="fixed left-0 right-0 top-14 z-40 h-0.5 bg-base-200" aria-hidden="true">
            <div
                class="h-full bg-primary transition-[width] duration-150 ease-out"
                :style="{ width: `${readingProgress}%` }"
            />
        </div>

        <main class="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:px-8">
            <NuxtLink
                to="/posts"
                class="group inline-flex items-center gap-2 text-sm font-medium text-base-content/50 transition-colors hover:text-primary"
            >
                <Icon name="uil:arrow-left" class="size-4 transition-transform group-hover:-translate-x-0.5" />
                All writing
            </NuxtLink>

            <article class="mt-10 sm:mt-14">
                <header v-motion-slide-bottom suppressHydrationWarning class="mx-auto max-w-4xl">
                    <div class="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        <span>Article {{ currentIndex + 1 }} of {{ posts.length }}</span>
                        <span aria-hidden="true" class="h-px w-10 bg-primary/50" />
                    </div>
                    <h1 class="text-4xl font-bold leading-[1.12] text-base-content sm:text-5xl lg:text-6xl">
                        {{ post!.title }}
                    </h1>
                    <p class="mt-6 max-w-3xl text-lg leading-relaxed text-base-content/65 sm:text-xl">
                        {{ post!.content }}
                    </p>

                    <div class="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-base-content/10 pt-5">
                        <div class="flex flex-wrap items-center gap-3 text-sm text-base-content/50">
                            <time :datetime="post!.date" class="font-medium text-base-content/70">
                                {{ formatDate(post!.date) }}
                            </time>
                            <span aria-hidden="true" class="size-1 rounded-full bg-base-content/25" />
                            <span class="inline-flex items-center gap-1.5">
                                <Icon name="uil:clock" class="size-4" />
                                {{ readingTime }} min read
                            </span>
                        </div>
                        <button
                            type="button"
                            class="btn btn-ghost btn-sm gap-2 text-base-content/60 hover:text-primary"
                            :aria-label="`${shareLabel} this article`"
                            @click="sharePost"
                        >
                            <Icon name="uil:share-alt" class="size-4" />
                            {{ shareLabel }}
                        </button>
                    </div>
                </header>

                <figure
                    v-motion-slide-bottom
                    suppressHydrationWarning
                    class="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-base-200 ring-1 ring-base-content/10 sm:mt-12"
                >
                    <PostsPostImage variant="hero" :post="post!" />
                </figure>

                <div class="post-content mx-auto mt-12 max-w-3xl sm:mt-16">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-html="articleHtml" />
                </div>
            </article>

            <nav class="mx-auto mt-16 max-w-4xl border-t border-base-content/10 pt-8 sm:mt-24" aria-label="Post navigation">
                <div class="mb-5 flex items-center justify-between">
                    <h2 class="text-lg font-bold text-base-content">Keep reading</h2>
                    <NuxtLink to="/posts" class="text-sm text-base-content/45 transition-colors hover:text-primary">
                        Browse all
                    </NuxtLink>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <NuxtLink
                        v-if="olderPost"
                        :to="`/posts/${olderPost.id}`"
                        class="group rounded-xl border border-base-content/10 p-5 transition hover:border-primary/30 hover:bg-base-200/40"
                    >
                        <span class="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                            <Icon name="uil:arrow-left" class="size-4" /> Older
                        </span>
                        <span class="line-clamp-2 font-bold leading-snug text-base-content transition-colors group-hover:text-primary">
                            {{ olderPost.title }}
                        </span>
                    </NuxtLink>
                    <div v-else class="hidden sm:block" />

                    <NuxtLink
                        v-if="newerPost"
                        :to="`/posts/${newerPost.id}`"
                        class="group rounded-xl border border-base-content/10 p-5 text-right transition hover:border-primary/30 hover:bg-base-200/40"
                    >
                        <span class="mb-2 flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wider text-base-content/40">
                            Newer <Icon name="uil:arrow-right" class="size-4" />
                        </span>
                        <span class="line-clamp-2 font-bold leading-snug text-base-content transition-colors group-hover:text-primary">
                            {{ newerPost.title }}
                        </span>
                    </NuxtLink>
                </div>
            </nav>
        </main>
    </div>
</template>
