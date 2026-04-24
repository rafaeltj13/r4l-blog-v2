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

const props = defineProps<{
    experience: Experience;
    isFirst?: boolean;
    isLast?: boolean;
}>();

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

/**
 * Split multi-line descriptions into paragraphs.
 * Handles template literal newlines and trims whitespace.
 */
const descriptionParagraphs = computed(() => {
    return props.experience.description
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean);
});
</script>

<template>
    <li>
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

            <!-- Technologies -->
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
</template>
