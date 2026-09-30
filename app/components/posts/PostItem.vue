<script setup lang="ts">
import type { Post } from "~/utils/postsData";

const props = defineProps<{
    post: Post;
    // Drop the year when the surrounding list already groups posts by year.
    hideYear?: boolean;
}>();

const { locale } = useI18n();
const dateLocale = computed(() => (locale.value === "pt-BR" ? "pt-BR" : "en-US"));

const formattedDate = computed(() =>
    new Date(`${props.post.date}T12:00:00`).toLocaleDateString(dateLocale.value, {
        year: props.hideYear ? undefined : "numeric",
        month: "short",
        day: "numeric",
    }),
);

const readingTime = computed(() => {
    const text = props.post.htmlContent.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
});
</script>

<template>
    <NuxtLink
        :to="`/posts/${post.id}`"
        class="group/item flex items-start gap-4 py-6 sm:gap-6 sm:py-8"
    >
        <div class="min-w-0 flex-1">
            <h3 class="font-body text-lg font-semibold leading-snug text-base-content transition-colors group-hover/item:text-primary sm:text-xl">
                {{ post.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-base-content/60">
                {{ post.content }}
            </p>
            <p class="mt-3 text-sm text-base-content/40">
                <time :datetime="post.date">{{ formattedDate }}</time>
                <span aria-hidden="true"> · </span>
                {{ $t("blog.minRead", { count: readingTime }) }}
            </p>
        </div>

        <div class="aspect-square w-20 shrink-0 overflow-hidden rounded-md bg-base-200 sm:aspect-[4/3] sm:w-32">
            <PostsPostImage
                variant="thumbnail"
                :post="post"
                class="opacity-90 transition-opacity duration-300 group-hover/item:opacity-100"
            />
        </div>
    </NuxtLink>
</template>
