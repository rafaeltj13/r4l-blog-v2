<script setup lang="ts">
import { posts as postsData } from "~/utils/postsData";

useHead({
    title: "R4L - Blog",
});

const { data: posts } = await useAsyncData("posts", async () => {
    return [...postsData].reverse();
});

const featuredPost = computed(() => posts.value?.[0] ?? null);
const remainingPosts = computed(() => posts.value?.slice(1) ?? []);

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
</script>

<template>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Header -->
        <header v-motion-slide-left suppressHydrationWarning class="mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-base-content">
                Blog
            </h1>
        </header>

        <!-- Featured Post -->
        <NuxtLink
            v-if="featuredPost"
            v-motion-slide-bottom
            :to="`/posts/${featuredPost.id}`"
            class="group relative block overflow-hidden rounded-3xl mb-20"
        >
            <div class="relative h-[420px] md:h-[480px] overflow-hidden bg-base-200">
                <PostsPostImage
                    variant="hero"
                    :post="featuredPost"
                    class="transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <!-- Gradient overlay -->
                <div
                    class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
                />
                <!-- Content overlay -->
                <div class="absolute inset-x-0 bottom-0 p-8 md:p-12">
                    <div class="flex items-center gap-3 mb-4">
                        <span
                            class="inline-flex items-center px-3 py-1 rounded-full bg-primary/90 text-primary-content text-xs font-semibold uppercase tracking-wide backdrop-blur-sm"
                        >
                            Latest
                        </span>
                        <time
                            :datetime="featuredPost.date"
                            class="text-white/70 text-sm font-medium"
                        >
                            {{ formatDate(featuredPost.date) }}
                        </time>
                    </div>
                    <h2
                        class="text-3xl md:text-4xl font-bold text-white leading-tight mb-3 group-hover:text-primary/90 transition-colors duration-300"
                    >
                        {{ featuredPost.title }}
                    </h2>
                    <p class="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl line-clamp-2">
                        {{ featuredPost.content }}
                    </p>
                    <span
                        class="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white/90 group-hover:gap-3 transition-all duration-300"
                    >
                        Read article
                        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                    </span>
                </div>
            </div>
        </NuxtLink>

        <!-- Remaining Posts -->
        <div v-if="remainingPosts.length" class="space-y-0">
            <NuxtLink
                v-for="(post, index) in remainingPosts"
                :key="post.id"
                :to="`/posts/${post.id}`"
                class="group relative flex flex-col sm:flex-row gap-6 sm:gap-8 py-8 border-b border-base-content/10 first:border-t first:border-base-content/10"
            >
                <!-- Index number -->
                <span
                    class="hidden sm:block text-5xl font-bold text-base-content/[0.06] group-hover:text-primary/15 transition-colors duration-300 leading-none select-none w-16 shrink-0"
                >
                    {{ String(index + 2).padStart(2, "0") }}
                </span>

                <!-- Thumbnail -->
                <div
                    class="w-full sm:w-44 md:w-52 h-40 sm:h-28 md:h-32 shrink-0 rounded-xl overflow-hidden bg-base-200"
                >
                    <PostsPostImage
                        variant="thumbnail"
                        :post="post"
                        class="transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </div>

                <!-- Content -->
                <div class="flex flex-col justify-center min-w-0">
                    <time
                        :datetime="post.date"
                        class="text-xs font-medium text-base-content/40 uppercase tracking-wide mb-2"
                    >
                        {{ formatDate(post.date) }}
                    </time>
                    <h3
                        class="text-xl md:text-2xl font-bold text-base-content leading-snug mb-2 group-hover:text-primary transition-colors duration-200"
                    >
                        {{ post.title }}
                    </h3>
                    <p
                        class="text-base-content/60 text-sm md:text-base leading-relaxed line-clamp-2"
                    >
                        {{ post.content }}
                    </p>
                </div>

                <!-- Arrow indicator -->
                <div
                    class="hidden sm:flex items-center ml-auto shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                >
                    <Icon
                        name="heroicons:arrow-right"
                        class="w-5 h-5 text-primary"
                    />
                </div>
            </NuxtLink>
        </div>
    </div>
</template>
