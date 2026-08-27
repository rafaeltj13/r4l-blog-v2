<script setup lang="ts">
import type { Post } from "~/utils/postsData";
import { posts as postsData } from "~/utils/postsData";

useSeoMeta({
    title: "R4L - Blog",
    description: "My thoughts and experiences in one place.",
});

const posts = [...postsData].reverse();
const featuredPost = computed(() => posts[0] ?? null);
const remainingPosts = computed(() => posts.slice(1));

const parseDate = (date: string) => new Date(`${date}T12:00:00`);

const formatDate = (date: string, long = false) =>
    parseDate(date).toLocaleDateString("en-US", {
        month: long ? "long" : "short",
        day: "numeric",
        year: "numeric",
    });

const getReadingTime = (post: Post) => {
    const text = post.htmlContent.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
};
</script>

<template>
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <header
            v-motion-slide-left
            suppressHydrationWarning
            class="mb-10 border-b border-base-content/10 pb-8 sm:mb-12 sm:flex sm:items-end sm:justify-between"
        >
            <div>
                <h1 class="max-w-3xl text-4xl font-bold leading-tight text-base-content sm:text-5xl">
                    Blog
                </h1>
                <p class="mt-4 max-w-2xl text-base leading-relaxed text-base-content/60 sm:text-lg">
                    My thoughts and experiences in one place.
                </p>
            </div>
            <p class="mt-6 text-sm text-base-content/45 sm:mt-0 sm:pb-1">
                {{ posts.length }} {{ posts.length === 1 ? "article" : "articles" }}
            </p>
        </header>

        <NuxtLink
            v-if="featuredPost"
            v-motion-slide-bottom
            :to="`/posts/${featuredPost.id}`"
            class="group grid overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 transition duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-base-content/5 lg:grid-cols-[1.05fr_0.95fr]"
        >
            <div class="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div class="mb-5 flex flex-wrap items-center gap-3 text-xs text-base-content/50">
                    <span class="badge badge-primary badge-sm font-semibold uppercase tracking-wider">
                        Latest
                    </span>
                    <time :datetime="featuredPost.date">
                        {{ formatDate(featuredPost.date, true) }}
                    </time>
                    <span aria-hidden="true" class="size-1 rounded-full bg-base-content/25" />
                    <span>{{ getReadingTime(featuredPost) }} min read</span>
                </div>

                <h2 class="text-2xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                    {{ featuredPost.title }}
                </h2>
                <p class="mt-4 max-w-xl text-base leading-relaxed text-base-content/65 sm:text-lg">
                    {{ featuredPost.content }}
                </p>
                <span class="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-base-content transition-colors group-hover:text-primary">
                    Read the article
                    <Icon
                        name="uil:arrow-right"
                        class="size-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </span>
            </div>

            <div class="relative min-h-64 overflow-hidden bg-base-200 sm:min-h-80 lg:min-h-[430px]">
                <PostsPostImage
                    variant="hero"
                    :post="featuredPost"
                    class="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-base-content/15 to-transparent lg:bg-linear-to-r" />
            </div>
        </NuxtLink>

        <section v-if="remainingPosts.length" class="mt-16 sm:mt-20" aria-labelledby="all-posts-heading">
            <div class="mb-5 flex items-center justify-between">
                <h2 id="all-posts-heading" class="text-lg font-bold text-base-content sm:text-xl">
                    More from the blog
                </h2>
                <span class="text-xs uppercase tracking-[0.16em] text-base-content/35">
                    Newest first
                </span>
            </div>

            <div class="divide-y divide-base-content/10 border-y border-base-content/10">
                <NuxtLink
                    v-for="post in remainingPosts"
                    :key="post.id"
                    :to="`/posts/${post.id}`"
                    class="group grid gap-5 py-7 transition-colors sm:grid-cols-[8rem_1fr_10rem] sm:items-center sm:gap-8 sm:py-8"
                >
                    <div class="flex items-center gap-3 text-xs text-base-content/45 sm:block">
                        <time :datetime="post.date" class="font-medium">
                            {{ formatDate(post.date) }}
                        </time>
                        <span aria-hidden="true" class="size-1 rounded-full bg-base-content/25 sm:hidden" />
                        <span class="sm:mt-1 sm:block">{{ getReadingTime(post) }} min read</span>
                    </div>

                    <div class="min-w-0">
                        <h3 class="text-xl font-bold leading-snug text-base-content transition-colors group-hover:text-primary sm:text-2xl">
                            {{ post.title }}
                        </h3>
                        <p class="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base">
                            {{ post.content }}
                        </p>
                    </div>

                    <div class="relative order-first aspect-[16/10] overflow-hidden rounded-xl bg-base-200 sm:order-none sm:aspect-[4/3]">
                        <PostsPostImage
                            variant="thumbnail"
                            :post="post"
                            class="transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <span class="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full bg-base-100/90 text-base-content opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100">
                            <Icon name="uil:arrow-up-right" class="size-4" />
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </section>
    </div>
</template>
