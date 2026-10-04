<script setup lang="ts">
import type { LocalizedPost } from "~/composables/useLocalizedContent";

const { t, locale } = useI18n();

useSeoMeta({
    title: () => t("seo.blog"),
    description: () => t("blog.subtitle"),
});

const dateLocale = computed(() => (locale.value === "pt-BR" ? "pt-BR" : "en-US"));

const localizedPosts = useLocalizedPosts();
const posts = computed(() => [...localizedPosts.value].reverse());
const featuredPost = computed(() => posts.value[0]);
const isFeaturedEnglishOnly = computed(
    () => locale.value === "pt-BR" && featuredPost.value?.locale === "en",
);
const olderPosts = computed(() => posts.value.slice(1));

const featuredDate = computed(() =>
    featuredPost.value
        ? new Date(`${featuredPost.value.date}T12:00:00`).toLocaleDateString(dateLocale.value, {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "",
);

const featuredReadingTime = computed(() => {
    const text = featuredPost.value?.htmlContent.replace(/<[^>]*>/g, " ") ?? "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
});

// Newest year first; posts inside each year keep the newest-first order.
const postsByYear = computed(() => {
    const groups: { year: string; posts: LocalizedPost[] }[] = [];
    for (const post of olderPosts.value) {
        const year = post.date.slice(0, 4);
        const group = groups.at(-1);
        if (group?.year === year) group.posts.push(post);
        else groups.push({ year, posts: [post] });
    }
    return groups;
});
</script>

<template>
    <div class="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <header class="mb-14 sm:mb-20">
            <h1 class="text-3xl text-base-content sm:text-4xl">Blog</h1>
            <p class="mt-3 text-base text-base-content/60 sm:text-lg">
                {{ $t("blog.subtitle") }}
            </p>
        </header>

        <NuxtLink
            v-if="featuredPost"
            :to="`/posts/${featuredPost.id}`"
            class="group mb-16 block sm:mb-20"
        >
            <div class="aspect-[16/9] overflow-hidden rounded-lg bg-base-200">
                <PostsPostImage
                    variant="hero"
                    :post="featuredPost"
                    class="transition-opacity duration-300 group-hover:opacity-90"
                />
            </div>
            <p class="mt-6 text-sm text-base-content/50">
                <span class="font-medium text-primary">{{ $t("blog.latest") }}</span>
                <span aria-hidden="true"> · </span>
                <time :datetime="featuredPost.date">{{ featuredDate }}</time>
                <span aria-hidden="true"> · </span>
                {{ $t("blog.minRead", { count: featuredReadingTime }) }}
                <template v-if="isFeaturedEnglishOnly">
                    <span aria-hidden="true"> · </span>
                    <abbr :title="$t('blog.englishOnly')" class="no-underline">EN</abbr>
                </template>
            </p>
            <h2 :lang="featuredPost.locale" class="mt-3 font-body text-2xl font-bold leading-tight text-base-content transition-colors group-hover:text-primary sm:text-3xl">
                {{ featuredPost.title }}
            </h2>
            <p :lang="featuredPost.locale" class="mt-3 text-base leading-relaxed text-base-content/60 sm:text-lg">
                {{ featuredPost.content }}
            </p>
        </NuxtLink>

        <section
            v-for="group in postsByYear"
            :key="group.year"
            class="grid gap-x-10 border-t border-base-content/10 sm:grid-cols-[4rem_1fr]"
            :aria-labelledby="`year-${group.year}`"
        >
            <h2
                :id="`year-${group.year}`"
                class="pt-6 font-body text-sm font-medium tabular-nums text-base-content/40 sm:pt-8"
            >
                {{ group.year }}
            </h2>

            <ul>
                <li
                    v-for="post in group.posts"
                    :key="post.id"
                    class="border-base-content/10 not-last:border-b"
                >
                    <PostsPostItem :post="post" hide-year />
                </li>
            </ul>
        </section>
    </div>
</template>
