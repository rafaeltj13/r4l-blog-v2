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
        <!-- Mouse devices: the screenshot expands above the text on hover. -->
        <div
            v-if="project.image"
            class="hidden pointer-fine:grid grid-rows-[0fr] opacity-0 group-hover/item:grid-rows-[1fr] group-hover/item:opacity-100 group-focus-visible/item:grid-rows-[1fr] group-focus-visible/item:opacity-100 transition-all duration-300"
        >
            <div class="min-h-0 overflow-hidden">
                <NuxtImg
                    :src="project.image"
                    :alt="$t('projects.screenshotAlt', { name: project.name })"
                    class="w-full aspect-video object-cover object-top rounded-xl bg-base-200 mb-4"
                    format="webp"
                    quality="80"
                    loading="lazy"
                    sizes="600px"
                />
            </div>
        </div>
        <div class="flex items-center gap-4 mb-3 pointer-fine:mb-2">
            <!-- Touch devices have no hover, so the screenshot sits left of the title. -->
            <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="$t('projects.screenshotAlt', { name: project.name })"
                class="pointer-fine:hidden shrink-0 w-1/2 aspect-video object-cover object-top-left rounded-lg bg-base-200 border border-base-content/10"
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
