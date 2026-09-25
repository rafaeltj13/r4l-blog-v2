<script setup lang="ts">
import AppChip from "~/components/ui/AppChip.vue";
import type { Project } from "~/utils/projectsData";

const props = withDefaults(
    defineProps<{
        project: Project;
        /** Highlights the card when it represents the platform being viewed. */
        currentPlatform?: boolean;
    }>(),
    {
        currentPlatform: false,
    },
);

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const createdLabel = computed(() => {
    const date = new Date(props.project.createdAt);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
});

/** Prefer the live site for the banner link, fall back to the repo. */
const showcaseUrl = computed(
    () => props.project.homepage ?? props.project.githubUrl ?? null,
);
</script>

<template>
    <div
        class="group/item grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300"
    >
        <div
            class="text-sm text-base-content/60 pt-1 font-mono whitespace-nowrap"
        >
            {{ createdLabel }}
        </div>
        <div>
            <component
                :is="showcaseUrl ? 'a' : 'div'"
                v-if="project.image"
                :href="showcaseUrl ?? undefined"
                :target="showcaseUrl ? '_blank' : undefined"
                :rel="showcaseUrl ? 'noopener noreferrer' : undefined"
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
            </component>
            <h3
                class="text-xl font-semibold text-base-content mb-2 group-hover/item:text-primary transition-colors"
            >
                <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="decoration-2 decoration-primary/30 underline-offset-4"
                >
                    {{ project.name }}
                </a>
                <span v-else>
                    {{ project.name }}
                </span>
                <span
                    class="badge badge-sm text-xs ml-2 align-middle"
                    :class="
                        project.visibility === 'Private'
                            ? 'badge-secondary badge-outline'
                            : 'badge-primary badge-outline'
                    "
                >
                    {{ project.visibility || "Public" }}
                </span>
                <span
                    v-if="currentPlatform"
                    class="badge badge-primary badge-sm ml-2 align-middle"
                >
                    You're here · this platform
                </span>
            </h3>
            <p class="text-base-content/80 leading-relaxed mb-4">
                {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
                <AppChip
                    v-for="tech in project.technologies"
                    :key="tech"
                    :label="tech"
                />
            </div>
            <div
                v-if="project.githubUrl || project.homepage"
                class="flex flex-wrap gap-4 text-sm"
            >
                <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-base-content/60 hover:text-primary transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
                        />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>GitHub</span>
                </a>
                <a
                    v-if="project.homepage"
                    :href="project.homepage"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-base-content/60 hover:text-primary transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        />
                    </svg>
                    <span>Live site</span>
                </a>
            </div>
        </div>
    </div>
</template>
