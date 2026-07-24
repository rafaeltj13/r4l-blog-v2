<script setup lang="ts">
import { posts } from "~/utils/postsData";

const route = useRoute();

const post = computed(() => {
    return posts.find((p) => p.id === route.params.id);
});

// Redirect if post not found
if (!post.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Post not found",
        fatal: true,
    });
}

// Update title meta
useHead({
    title: post.value?.title ? `R4L - ${post.value.title}` : "R4L - Blog Post",
});

// Reading time estimate (avg 200 wpm)
const readingTime = computed(() => {
    const text = post.value?.htmlContent?.replace(/<[^>]*>/g, "") ?? "";
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
});

// Adjacent posts for navigation
const currentIndex = computed(() =>
    posts.findIndex((p) => p.id === route.params.id),
);
const prevPost = computed(() =>
    currentIndex.value > 0 ? posts[currentIndex.value - 1] : null,
);
const nextPost = computed(() =>
    currentIndex.value < posts.length - 1
        ? posts[currentIndex.value + 1]
        : null,
);

// Reading progress
const readingProgress = ref(0);

onMounted(() => {
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        readingProgress.value =
            docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    onUnmounted(() => window.removeEventListener("scroll", updateProgress));
});

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
</script>

<template>
    <div>
        <!-- Reading progress bar -->
        <div class="fixed top-14 left-0 right-0 z-40 h-[3px] bg-transparent">
            <div
                class="h-full bg-primary/80 transition-all duration-150 ease-out rounded-r-full"
                :style="{ width: `${readingProgress}%` }"
            />
        </div>

        <!-- Article Body -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <!-- Back link -->
            <div v-motion-slide-left class="mb-8">
                <NuxtLink
                    to="/posts"
                    class="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-primary transition-colors duration-200 group"
                >
                    <Icon
                        name="heroicons:arrow-left"
                        class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Back to posts
                </NuxtLink>
            </div>

            <!-- Title block -->
            <header v-motion-slide-bottom class="mb-10">
                <h1
                    class="text-4xl md:text-5xl font-bold text-base-content leading-[1.1] mb-6"
                >
                    {{ post!.title }}
                </h1>

                <div
                    class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-base-content/50"
                >
                    <time :datetime="post!.date" class="font-medium">
                        {{ formatDate(post!.date) }}
                    </time>
                    <span class="w-1 h-1 rounded-full bg-base-content/30" />
                    <span class="flex items-center gap-1.5 font-medium">
                        <Icon
                            name="heroicons:clock"
                            class="w-4 h-4 text-base-content/40"
                        />
                        {{ readingTime }} min read
                    </span>
                </div>
            </header>

            <!-- Hero Image -->
            <figure
                v-motion-slide-bottom
                class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 ring-1 ring-base-content/10 bg-base-200"
            >
                <PostsPostImage variant="hero" :post="post!" />
            </figure>

            <!-- Divider -->
            <div class="h-px bg-linear-to-r from-primary/40 via-base-content/10 to-transparent mb-12" />

            <!-- Content -->
            <div v-motion-slide-bottom :delay="150">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="post!.htmlContent" />
            </div>

            <!-- Post Navigation -->
            <nav class="mt-20 pt-8 border-t border-base-content/10">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <NuxtLink
                        v-if="prevPost"
                        :to="`/posts/${prevPost.id}`"
                        class="group flex flex-col gap-1 p-5 rounded-2xl border border-base-content/10 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200"
                    >
                        <span class="text-xs font-medium text-base-content/40 uppercase tracking-wide mb-1">
                            &larr; Previous
                        </span>
                        <span class="text-sm font-semibold text-base-content group-hover:text-primary transition-colors line-clamp-1">
                            {{ prevPost.title }}
                        </span>
                    </NuxtLink>
                    <div v-else />
                    <NuxtLink
                        v-if="nextPost"
                        :to="`/posts/${nextPost.id}`"
                        class="group flex flex-col gap-1 p-5 rounded-2xl border border-base-content/10 hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200 text-right"
                    >
                        <span class="text-xs font-medium text-base-content/40 uppercase tracking-wide mb-1">
                            Next &rarr;
                        </span>
                        <span class="text-sm font-semibold text-base-content group-hover:text-primary transition-colors line-clamp-1">
                            {{ nextPost.title }}
                        </span>
                    </NuxtLink>
                </div>
            </nav>

            <!-- Bottom bar -->
            <div class="mt-12 pb-12 flex items-center justify-between">
                <NuxtLink
                    to="/posts"
                    class="inline-flex items-center gap-2 text-sm font-medium text-base-content/50 hover:text-primary transition-colors duration-200 group"
                >
                    <Icon
                        name="heroicons:arrow-left"
                        class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    All posts
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style>
.prose {
    max-width: none;
}
.prose img {
    border-radius: 0.75rem;
}
</style>
