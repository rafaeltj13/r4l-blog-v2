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
                <template
                    v-for="(screenshot, index) in [activeScreenshot, ...screenshots]"
                    :key="index"
                >
                    <div
                        v-if="screenshot.portrait"
                        class="min-h-0 overflow-hidden p-2"
                        :aria-hidden="index === 0 ? true : undefined"
                        @mouseenter="index > 0 && (activeIndex = index - 1)"
                    >
                        <div class="pointer-events-none grid h-full place-items-center">
                            <div class="mockup-phone h-full w-auto max-w-full rounded-2xl border-2 p-0.5">
                                <div class="mockup-phone-camera" />
                                <div class="mockup-phone-display rounded-xl">
                                    <NuxtImg
                                        :src="screenshot.src"
                                        :alt="index === 0 ? '' : `${$t('projects.screenshotAlt', { name })}: ${$t(`projects.views.${screenshot.view}`)}`"
                                        format="webp"
                                        quality="85"
                                        loading="lazy"
                                        sizes="200px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <NuxtImg
                        v-else
                        :src="screenshot.src"
                        :alt="index === 0 ? '' : `${$t('projects.screenshotAlt', { name })}: ${$t(`projects.views.${screenshot.view}`)}`"
                        :aria-hidden="index === 0 ? true : undefined"
                        class="min-h-0 object-top object-cover"
                        format="webp"
                        quality="85"
                        loading="lazy"
                        sizes="450px"
                        @mouseenter="index > 0 && (activeIndex = index - 1)"
                    />
                </template>
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
