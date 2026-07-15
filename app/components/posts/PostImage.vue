<script setup lang="ts">
import type { Post } from "~/utils/postsData";

interface Props {
    post: Post;
    variant?: "thumbnail" | "card" | "hero";
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "card",
    class: "",
});

const isHero = computed(() => props.variant === "hero");
const isPortrait = computed(() => props.post.aspectRatio === "9:16");

const fitClass = computed(() => {
    return isPortrait.value
        ? "object-contain bg-base-200"
        : "object-cover";
});

const sizes = computed(() => {
    switch (props.variant) {
        case "thumbnail":
            return "100vw md:200px";
        case "card":
            return "100vw md:50vw";
        case "hero":
            return "100vw lg:800px";
        default:
            return "100vw";
    }
});

const loading = computed(() => (isHero.value ? "eager" : "lazy"));
</script>

<template>
    <NuxtImg
        :src="`images/${props.post.image}.jpg`"
        :alt="props.post.title"
        :class="['w-full h-full', fitClass, props.class]"
        :sizes="sizes"
        :placeholder="!isHero"
        :preload="isHero"
        :loading="loading"
        decoding="async"
    />
</template>
