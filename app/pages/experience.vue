<script setup lang="ts">
import { experienceData } from "~/utils/experienceData";
useHead({
    title: "R4L - Experience",
});

const route = useRoute();
const router = useRouter();

const validTabs = ["projects", "resume"];

// Get initial tab from URL query param or default to 'projects'
const getTabFromQuery = (): string => {
    const tabParam = route.query.tab as string | undefined;
    if (tabParam && validTabs.includes(tabParam)) {
        return tabParam;
    }
    return "resume";
};

// Initialize tab from query param (works on both server and client)
const activeTab = useState("experience-active-tab", () => getTabFromQuery());

// Sync URL query param when tab changes
watch(activeTab, (newTab) => {
    router.replace({ query: { ...route.query, tab: newTab } });
});

// Sync state with URL on navigation (handles browser back/forward)
watch(
    () => route.query.tab,
    (newTabQuery) => {
        const newTab = (newTabQuery as string) || "projects";
        if (validTabs.includes(newTab) && activeTab.value !== newTab) {
            activeTab.value = newTab;
        }
    },
);

const tabs = [
    { label: "Resume", value: "resume" },
    { label: "Projects", value: "projects" },
];
</script>

<template>
    <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-motion-slide-left suppressHydrationWarning class="mb-12">
            <h1 class="text-4xl font-bold text-base-content mb-8">
                Professional Experience
            </h1>

            <div class="w-fit">
                <UiAppTabs v-model="activeTab" :tabs="tabs" />
            </div>
        </div>

        <!-- Projects Content -->
        <div
            v-if="activeTab === 'projects'"
            v-motion-slide-bottom
            suppressHydrationWarning
        >
            <ul
                class="timeline timeline-snap-icon timeline-compact timeline-vertical"
            >
                <ExperienceItem
                    v-for="(item, index) in experienceData"
                    :key="index"
                    :experience="item"
                    timeline
                    :is-first="index === 0"
                    :is-last="index === experienceData.length - 1"
                />
            </ul>
        </div>

        <!-- Resume Content -->
        <div v-else v-motion-slide-bottom suppressHydrationWarning>
            <Resume />
        </div>
    </div>
</template>
