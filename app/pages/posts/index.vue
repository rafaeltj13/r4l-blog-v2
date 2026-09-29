<script setup lang="ts">
import type { Post } from "~/utils/postsData";
import { posts as postsData } from "~/utils/postsData";

const { t, locale } = useI18n();

useSeoMeta({
    title: () => t("seo.blog"),
    description: () => t("blog.subtitle"),
});

const dateLocale = computed(() => (locale.value === "pt-BR" ? "pt-BR" : "en-US"));

const posts = [...postsData].reverse();

// Newest year first; posts inside each year keep the newest-first order.
const postsByYear = computed(() => {
    const groups: { year: string; posts: Post[] }[] = [];
    for (const post of posts) {
        const year = post.date.slice(0, 4);
        const group = groups.at(-1);
        if (group?.year === year) group.posts.push(post);
        else groups.push({ year, posts: [post] });
    }
    return groups;
});

const formatDate = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(dateLocale.value, {
        month: "short",
        day: "numeric",
    });

const getReadingTime = (post: Post) => {
    const text = post.htmlContent.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
};
</script>

<template>
    <div class="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-6 sm:pt-20">
        <header class="mb-14 sm:mb-20">
            <h1 class="text-3xl text-base-content sm:text-4xl">Blog</h1>
            <p class="mt-3 text-base text-base-content/60 sm:text-lg">
                {{ $t("blog.subtitle") }}
            </p>
        </header>

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
                    <NuxtLink
                        :to="`/posts/${post.id}`"
                        class="group flex items-start gap-6 py-6 sm:py-8"
                    >
                        <div class="min-w-0 flex-1">
                            <h3 class="font-body text-lg font-semibold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-xl">
                                {{ post.title }}
                            </h3>
                            <p class="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-base-content/60">
                                {{ post.content }}
                            </p>
                            <p class="mt-3 text-sm text-base-content/40">
                                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                                <span aria-hidden="true"> · </span>
                                {{ $t("blog.minRead", { count: getReadingTime(post) }) }}
                            </p>
                        </div>

                        <div class="hidden aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-md bg-base-200 sm:block">
                            <PostsPostImage
                                variant="thumbnail"
                                :post="post"
                                class="opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                            />
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </section>
    </div>
</template>
