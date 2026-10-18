<script setup lang="ts">
import type { ProjectScreenshot } from '~/utils/projectsData';

const props = defineProps<{
    name: string;
    screenshots: ProjectScreenshot[];
}>();

const activeIndex = ref(0);
const activeScreenshot = computed(() => props.screenshots[activeIndex.value]!);
</script>

<template>
    <div
        role="group"
        :aria-label="$t('projects.galleryLabel', { name })"
        class="rounded-xl border border-base-content/10 bg-base-200 shadow-xl overflow-hidden"
    >
        <div class="relative aspect-video">
            <figure class="hover-gallery absolute inset-0 h-full grid-rows-[minmax(0,1fr)]">
                <!-- daisyUI uses the first child as a fallback, with hover columns after it. -->
                <NuxtImg
                    :src="activeScreenshot.src"
                    alt=""
                    aria-hidden="true"
                    class="min-h-0 object-top"
                    :class="activeScreenshot.portrait ? '!object-contain' : 'object-cover'"
                    format="webp"
                    quality="85"
                    loading="lazy"
                    sizes="450px"
                />
                <NuxtImg
                    v-for="(screenshot, index) in screenshots"
                    :key="screenshot.src"
                    :src="screenshot.src"
                    :alt="`${$t('projects.screenshotAlt', { name })}: ${$t(`projects.views.${screenshot.view}`)}`"
                    class="min-h-0 object-top"
                    :class="screenshot.portrait ? '!object-contain' : 'object-cover'"
                    format="webp"
                    quality="85"
                    loading="lazy"
                    sizes="450px"
                    @mouseenter="activeIndex = index"
                />
            </figure>
        </div>
        <div class="flex items-center gap-2 px-3 py-1">
            <p class="min-w-0 flex-1 text-xs text-base-content/70">
                {{ $t(`projects.views.${activeScreenshot.view}`) }}
            </p>
            <div class="flex shrink-0">
                <button
                    v-for="(screenshot, index) in screenshots"
                    :key="screenshot.src"
                    type="button"
                    class="grid size-8 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                    :aria-label="$t('projects.showScreenshot', { name, view: $t(`projects.views.${screenshot.view}`) })"
                    :aria-pressed="activeIndex === index"
                    @click="activeIndex = index"
                >
                    <span
                        class="h-1.5 rounded-full transition-all"
                        :class="activeIndex === index ? 'w-4 bg-primary' : 'w-1.5 bg-base-content/30'"
                    />
                </button>
            </div>
        </div>
    </div>
</template>
