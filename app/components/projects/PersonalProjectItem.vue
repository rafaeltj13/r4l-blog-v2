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
        class="group/item relative block mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300"
        :class="showcaseUrl ? 'cursor-pointer' : 'cursor-default'"
    >
        <!-- Desktop with a mouse: the screenshot pops out to the left, over the profile column, without moving the content. -->
        <div
            v-if="project.image"
            class="hidden lg:pointer-fine:block absolute right-full top-4 mr-4 w-[min(28rem,32vw)] z-10 pointer-events-none opacity-0 translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-focus-visible/item:opacity-100 group-focus-visible/item:translate-x-0 transition duration-300"
        >
            <NuxtImg
                :src="project.image"
                :alt="$t('projects.screenshotAlt', { name: project.name })"
                class="w-full aspect-video object-cover object-top rounded-xl bg-base-200 border border-base-content/10 shadow-xl"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="450px"
            />
        </div>
        <div class="flex items-center gap-4 mb-3 lg:pointer-fine:mb-2">
            <!-- Touch devices and narrow screens: the screenshot sits left of the title. -->
            <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="$t('projects.screenshotAlt', { name: project.name })"
                class="lg:pointer-fine:hidden shrink-0 w-1/2 max-w-xs aspect-video object-cover object-top-left rounded-lg bg-base-200 border border-base-content/10"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="400px"
            />
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
</template>
