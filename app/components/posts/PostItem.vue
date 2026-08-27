<script setup lang="ts">
import type { Post } from "~/utils/postsData";

const props = defineProps<{
    post: Post;
}>();

const formatDate = (date: string) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const readingTime = computed(() => {
    const text = props.post.htmlContent.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
});
</script>

<template>
    <NuxtLink
        :to="`/posts/${post.id}`"
        class="group/item grid grid-cols-[6rem_1fr] gap-4 border-b border-base-content/10 pb-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
    >
        <div class="aspect-square overflow-hidden rounded-xl bg-base-200 sm:aspect-[4/3]">
            <PostsPostImage
                variant="thumbnail"
                :post="post"
                class="transition-transform duration-500 group-hover/item:scale-105"
            />
        </div>

        <div class="flex min-w-0 flex-col justify-center">
            <div class="mb-2 flex items-center gap-2 text-xs text-base-content/45">
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                <span aria-hidden="true" class="size-1 rounded-full bg-base-content/25" />
                <span>{{ readingTime }} min</span>
            </div>
            <h4 class="text-base font-bold leading-snug text-base-content transition-colors group-hover/item:text-primary sm:text-lg">
                {{ post.title }}
            </h4>
            <p class="mt-2 hidden line-clamp-2 text-sm leading-relaxed text-base-content/60 sm:block">
                {{ post.content }}
            </p>
        </div>
    </NuxtLink>
</template>
