<script setup lang="ts">
import AppChip from "~/components/ui/AppChip.vue";
import ProjectGallery from "~/components/projects/ProjectGallery.vue";
import type { Project } from "~/utils/projectsData";

const props = defineProps<{
    project: Project;
}>();
/** Prefer the live site, fall back to the repo. Null means non-clickable. */
const showcaseUrl = computed(
    () => props.project.homepage ?? props.project.githubUrl ?? null,
);
const screenshots = computed(() => props.project.screenshots ?? (
    props.project.image ? [{ src: props.project.image, view: 'landing' as const }] : []
));
</script>

<template>
    <article class="group/item relative flex flex-col mb-12 p-4 rounded-box hover:bg-base-content/5 transition-colors duration-300">
        <component
            :is="showcaseUrl ? 'a' : 'div'"
            :href="showcaseUrl ?? undefined"
            :target="showcaseUrl ? '_blank' : undefined"
            :rel="showcaseUrl ? 'noopener noreferrer' : undefined"
            class="block rounded-box focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
            :class="showcaseUrl ? 'cursor-pointer' : 'cursor-default'"
        >
            <div class="flex items-center gap-4 mb-3 lg:pointer-fine:mb-2">
                <h3
                    class="text-xl font-semibold text-base-content group-hover/item:text-primary transition-colors"
                >
                    {{ project.name }}
                </h3>
            </div>
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
        <!-- Padding bridges the gap so the desktop preview stays open while entering it. -->
        <div
            v-if="screenshots.length"
            class="order-first mb-4 max-w-sm lg:pointer-fine:mb-0 lg:pointer-fine:max-w-none lg:pointer-fine:absolute lg:pointer-fine:right-full lg:pointer-fine:top-4 lg:pointer-fine:pr-4 lg:pointer-fine:w-[min(29rem,33vw)] lg:pointer-fine:z-10 lg:pointer-fine:invisible lg:pointer-fine:opacity-0 lg:pointer-fine:translate-x-3 lg:pointer-fine:group-hover/item:visible lg:pointer-fine:group-hover/item:opacity-100 lg:pointer-fine:group-hover/item:translate-x-0 lg:pointer-fine:group-focus-within/item:visible lg:pointer-fine:group-focus-within/item:opacity-100 lg:pointer-fine:group-focus-within/item:translate-x-0 transition duration-300"
        >
            <ProjectGallery :name="project.name" :screenshots="screenshots" />
        </div>
    </article>
</template>
