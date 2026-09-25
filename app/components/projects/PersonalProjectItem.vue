<script setup lang="ts">
import AppChip from "~/components/ui/AppChip.vue";
import type { Project } from "~/utils/projectsData";

const props = defineProps<{
    project: Project;
}>();
/** Prefer the live site, fall back to the repo. Null means non-clickable. */
const showcaseUrl = computed(
    () => props.project.homepage ?? props.project.githubUrl ?? null,
);</script>

<template>
    <component
        :is="showcaseUrl ? 'a' : 'div'"
        :href="showcaseUrl ?? undefined"
        :target="showcaseUrl ? '_blank' : undefined"
        :rel="showcaseUrl ? 'noopener noreferrer' : undefined"
        class="group/item block mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300"
        :class="showcaseUrl ? 'cursor-pointer' : 'cursor-default'"
    >
        <div
            v-if="project.image"
            class="block overflow-hidden rounded-xl bg-base-200 mb-4"
        >
            <NuxtImg
                :src="project.image"
                :alt="`${project.name} screenshot`"
                class="w-full aspect-video object-cover object-top transition-transform duration-500 group-hover/item:scale-[1.02]"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 600px"
            />
        </div>
        <h3
            class="text-xl font-semibold text-base-content mb-2 group-hover/item:text-primary transition-colors"
        >
            {{ project.name }}
        </h3>
        <p class="text-base-content/80 leading-relaxed mb-4">
            {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-2">
            <AppChip
                v-for="tech in project.technologies"
                :key="tech"
                :label="tech"
            />
        </div>
    </component>
</template>
