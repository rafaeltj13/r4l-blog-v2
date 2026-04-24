<script setup lang="ts">
import AppChip from "~/components/ui/AppChip.vue";

export interface Experience {
    title: string;
    companyName: string;
    technologies: string[];
    dateStart: string;
    dateEnd?: string | null;
    description: string;
    partner?: string;
}

const props = withDefaults(
    defineProps<{
        experience: Experience;
        timeline?: boolean;
        isFirst?: boolean;
        isLast?: boolean;
    }>(),
    {
        timeline: false,
        isFirst: false,
        isLast: false,
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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

const isPresent = computed(() => {
    if (!props.experience.dateEnd) return true;
    return new Date(props.experience.dateEnd) > new Date();
});

const dateRange = computed(() => {
    const start = formatDate(props.experience.dateStart);
    const end = isPresent.value
        ? "Present"
        : formatDate(props.experience.dateEnd!);
    return `${start} – ${end}`;
});

const descriptionParagraphs = computed(() => {
    return props.experience.description
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean);
});
</script>

<template>
    <!-- Timeline mode -->
    <li v-if="timeline">
        <hr v-if="!isFirst" class="bg-primary" />
        <div class="timeline-middle">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 text-primary"
            >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <div class="timeline-end mb-10">
            <time class="font-mono italic text-sm text-base-content/60">{{
                dateRange
            }}</time>
            <div class="text-lg font-bold text-base-content mt-1">
                {{ experience.title }}
                <span
                    v-if="experience.companyName || experience.partner"
                    class="text-base-content/60 font-normal"
                >
                    &ndash; {{ experience.companyName }}
                    <span v-if="experience.partner"
                        >/ {{ experience.partner }}</span
                    >
                </span>
            </div>
            <div class="mt-2 mb-4 space-y-3">
                <p
                    v-for="(paragraph, idx) in descriptionParagraphs"
                    :key="idx"
                    class="text-base-content/80 leading-relaxed"
                >
                    {{ paragraph }}
                </p>
            </div>
            <div class="flex flex-wrap gap-2">
                <AppChip
                    v-for="tech in experience.technologies"
                    :key="tech"
                    :label="tech"
                />
            </div>
        </div>
        <hr v-if="!isLast" class="bg-primary" />
    </li>

    <!-- Standalone mode (no timeline) -->
    <div
        v-else
        class="group/item grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300"
    >
        <div
            class="text-sm text-base-content/60 pt-1 font-mono whitespace-nowrap"
        >
            {{ dateRange }}
        </div>
        <div>
            <h3
                class="text-xl font-semibold text-base-content mb-2 group-hover/item:text-primary transition-colors"
            >
                {{ experience.title }}
                <span
                    v-if="experience.companyName || experience.partner"
                    class="text-base-content/60 font-normal"
                >
                    &ndash; {{ experience.companyName }}
                    <span v-if="experience.partner"
                        >/ {{ experience.partner }}</span
                    >
                </span>
            </h3>
            <div class="mb-4 space-y-3">
                <p
                    v-for="(paragraph, idx) in descriptionParagraphs"
                    :key="idx"
                    class="text-base-content/80 leading-relaxed"
                >
                    {{ paragraph }}
                </p>
            </div>
            <div class="flex flex-wrap gap-2">
                <AppChip
                    v-for="tech in experience.technologies"
                    :key="tech"
                    :label="tech"
                />
            </div>
        </div>
    </div>
</template>
