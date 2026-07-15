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

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
    <div>
        <!-- Reading progress bar -->
        <div class="fixed top-14 left-0 right-0 z-40 h-0.5 bg-base-200">
        <div
            class="h-full bg-primary transition-all duration-100 ease-out"
            :style="{ width: `${readingProgress}%` }"
        />
    </div>

    <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="post" class="max-w-3xl mx-auto">
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

            <!-- Title & Meta -->
            <div v-motion-slide-left class="mb-10">
                <h1
                    class="text-4xl md:text-5xl font-bold text-base-content mb-6 leading-tight"
                >
                    {{ post.title }}
                </h1>

                <div
                    class="flex flex-wrap items-center gap-3 text-sm text-base-content/60"
                >
                    <!-- Article badge -->
                    <span
                        class="badge badge-primary badge-soft text-xs font-semibold uppercase tracking-wide"
                    >
                        <Icon
                            name="heroicons:document-text"
                            class="w-3 h-3 mr-1"
                        />
                        Article
                    </span>

                    <span class="text-base-content/20">•</span>

                    <!-- Date -->
                    <span class="flex items-center gap-1.5 font-medium">
                        <Icon
                            name="heroicons:calendar-days"
                            class="w-4 h-4 text-base-content/40"
                        />
                        <time :datetime="post.date">{{
                            new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })
                        }}</time>
                    </span>

                    <span class="text-base-content/20">•</span>

                    <!-- Reading time -->
                    <span class="flex items-center gap-1.5 font-medium">
                        <Icon
                            name="heroicons:clock"
                            class="w-4 h-4 text-base-content/40"
                        />
                        {{ readingTime }} min read
                    </span>
                </div>
            </div>

            <!-- Hero Image -->
            <figure
                v-motion-slide-bottom
                class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12 ring-1 ring-base-content/10 bg-base-200"
            >
                <PostsPostImage variant="hero" :post="post" />
            </figure>

            <!-- Content -->
            <div v-motion-slide-bottom :delay="200">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="post.htmlContent" />
            </div>

            <!-- Footer: navigation -->
            <div
                v-motion-fade
                class="mt-16 pt-8 border-t border-base-content/10 flex items-center justify-between"
            >
                <NuxtLink
                    to="/posts"
                    class="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors duration-200 group"
                >
                    <Icon
                        name="heroicons:arrow-left"
                        class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    All posts
                </NuxtLink>

                <button
                    class="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors duration-200"
                    title="Back to top"
                    @click="scrollToTop"
                >
                    <Icon name="heroicons:arrow-up" class="w-4 h-4" />
                    Back to top
                </button>
            </div>
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
