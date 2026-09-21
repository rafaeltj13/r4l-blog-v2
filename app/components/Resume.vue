<script setup lang="ts">
import { FULL_NAME, experiences, personalProjects, skillTaxonomy } from "~/utils/cv/data";
import { buildCvDocument, groupByCompany } from "~/utils/cv/document";
import { A4_HEIGHT_PX, generateResumePDF, measureResumeHeight } from "~/utils/cv/pdf";
import { cvPresets } from "~/utils/cv/presets";
import type { CvDocument, CvPresetId, CvSelection } from "~/utils/cv/types";
import { useTailoredCv } from "~/composables/useTailoredCv";

const props = withDefaults(
    defineProps<{
        showButton?: boolean;
    }>(),
    {
        showButton: true,
    },
);

const { dialogRef, open, close } = useDialog();

/**
 * What the PDF preview is currently rendering:
 * - "all":      full history (page default)
 * - "front":    frontend preset behind the Frontend CV button
 * - "full":     full-stack preset behind the Full-stack CV button
 * - "tailored": AI selection from the job-description dialog
 *
 * Every mode resolves through `buildCvDocument()`, so the rendered
 * `CvDocument` always has the exact shape the AI was asked to return.
 */
type ViewMode = CvPresetId | "all" | "tailored";
const activeMode = ref<ViewMode>("all");

const {
    jobDescription,
    isGenerating,
    optimizeError,
    tailoredSelection,
    generateTailoredSelection,
    resetTailored,
} = useTailoredCv();

const FULL_SUMMARY =
    "Senior Software Engineer with 8+ years of expertise specializing in web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.";

const activeSelection = computed<CvSelection | null>(() => {
    if (activeMode.value === "tailored") return tailoredSelection.value;
    if (activeMode.value === "front" || activeMode.value === "full") {
        return cvPresets[activeMode.value];
    }
    return null;
});

/** The single document the template renders — presets and AI go through here. */
const cvDocument = computed<CvDocument>(() => {
    const selection = activeSelection.value;
    if (selection) return buildCvDocument(selection);
    // Page default: everything, including deprecated entries (page display,
    // not a download — downloads always go through front/full/tailored).
    return buildCvDocument(
        {
            position: "Senior Software Engineer",
            summary: FULL_SUMMARY,
            experienceIds: experiences.map((e) => e.id),
            projectIds: personalProjects.map((p) => p.id),
            skills: skillTaxonomy,
        },
        { includeDeprecated: true },
    );
});

const groupedExperience = computed(() =>
    groupByCompany(cvDocument.value.experiences),
);

/**
 * Ensure tailored content fits a single A4 page by dropping the least
 * relevant (last) experience until it measures within the page height.
 */
const fitTailoredToOnePage = async (minExperiences = 2): Promise<void> => {
    const safetyMargin = 10;
    const maxHeight = A4_HEIGHT_PX - safetyMargin;

    while (
        tailoredSelection.value &&
        tailoredSelection.value.experienceIds.length > minExperiences
    ) {
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 50));

        const height = measureResumeHeight();
        if (height <= maxHeight) break;

        tailoredSelection.value = {
            ...tailoredSelection.value,
            experienceIds: tailoredSelection.value.experienceIds.slice(0, -1),
        };
    }
};

const resetResumeState = () => {
    activeMode.value = "all";
    resetTailored();
};

const downloadCV = async (type: CvPresetId = "front") => {
    activeMode.value = type;

    // Wait for Vue reactivity and DOM updates
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));

    await generateResumePDF(cvPresets[type].filename);
    close();

    // Reset to showing everything on the page
    resetResumeState();
};

const downloadTailoredCV = async () => {
    const selection = await generateTailoredSelection();
    if (!selection) return;

    activeMode.value = "tailored";

    // Wait for Vue reactivity and DOM updates
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Ensure the tailored content fits on a single A4 page
    await fitTailoredToOnePage();

    await generateResumePDF("Rafael_Maciel_Tailored_CV.pdf");
    close();

    // Reset state
    resetResumeState();
};
</script>

<template>
    <div
        class="resume-wrapper w-full max-w-3xl mx-auto bg-white shadow-xl p-6 md:p-8 print:p-0 print:shadow-none print:max-w-none text-slate-800"
    >
        <!-- ===== Header ===== -->
        <header class="mb-4 pb-3 text-center">
            <h1
                class="text-xl font-bold text-primary tracking-tight leading-tight"
            >
                {{ FULL_NAME }}
            </h1>
            <p class="text-[11px] text-slate-700 font-medium mt-0.5">
                {{ cvDocument.position }}
            </p>

            <!-- Contact: row 1 (location, phone, email) -->
            <div
                class="mt-1.5 flex flex-nowrap items-center justify-center gap-x-2 text-[10px] text-slate-600 whitespace-nowrap"
            >
                <span>{{ cvDocument.contact.location }}</span>
                <span class="text-slate-300">|</span>
                <a
                    :href="'tel:' + cvDocument.contact.phone"
                    class="hover:text-primary transition-colors"
                    >{{ cvDocument.contact.phone }}</a
                >
                <span class="text-slate-300">|</span>
                <a
                    :href="'mailto:' + cvDocument.contact.email"
                    class="hover:text-primary transition-colors"
                    >{{ cvDocument.contact.email }}</a
                >
            </div>

            <!-- Contact: row 2 (linkedin, github) -->
            <div
                class="mt-0.5 flex flex-nowrap items-center justify-center gap-x-2 text-[10px] whitespace-nowrap"
            >
                <a
                    :href="cvDocument.contact.linkedin.url"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                    >{{ cvDocument.contact.linkedin.label }}</a
                >
                <span class="text-slate-300">|</span>
                <a
                    :href="cvDocument.contact.github.url"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                    >{{ cvDocument.contact.github.label }}</a
                >
            </div>
        </header>

        <!-- ===== Summary ===== -->
        <section class="mb-4">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-1.5 pb-1 border-b border-primary/20"
            >
                Summary
            </h2>
            <p class="text-[11px] text-slate-700 leading-relaxed">
                {{ cvDocument.summary }}
            </p>
        </section>

        <!-- ===== Skills ===== -->
        <section class="mb-4">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                Skills
            </h2>
            <dl
                class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-x-3 gap-y-1"
            >
                <template
                    v-for="(items, category) in cvDocument.skills"
                    :key="category"
                >
                    <dt class="text-[11px] font-semibold text-slate-900">
                        {{ category }}
                    </dt>
                    <dd class="text-[11px] text-slate-600 leading-relaxed">
                        {{ items.join(" · ") }}
                    </dd>
                </template>
            </dl>
        </section>

        <!-- ===== Professional Experience ===== -->
        <section class="mb-4">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2.5 pb-1 border-b border-primary/20"
            >
                Professional Experience
            </h2>

            <div class="space-y-3">
                <div
                    v-for="group in groupedExperience"
                    :key="group.name"
                    class="group"
                >
                    <!-- Job Header -->
                    <div class="mb-2">
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                        >
                            <h3
                                class="font-bold text-slate-900 text-[12px] leading-tight"
                            >
                                {{ group.title }}
                                <span class="text-slate-500 font-normal">
                                    @ {{ group.name }}
                                </span>
                            </h3>
                            <span
                                class="text-[10px] font-mono text-slate-500 whitespace-nowrap"
                                >{{ group.period }}</span
                            >
                        </div>
                        <p
                            v-if="group.location"
                            class="text-[10px] text-slate-500 mt-0.5"
                        >
                            {{ group.location }}
                        </p>
                    </div>

                    <!-- Projects List -->
                    <div
                        v-for="(project, idx) in group.items"
                        :key="project.id ?? idx"
                        class="mb-2 last:mb-0"
                    >
                        <p
                            v-if="project.partner"
                            class="text-[11px] font-semibold text-slate-800 mb-0.5"
                        >
                            {{ project.partner }}
                        </p>

                        <ul class="space-y-0.5 ml-1">
                            <li
                                v-for="(point, pIdx) in cvDocument.bullets[
                                    project.id
                                ]"
                                :key="pIdx"
                                class="flex items-start gap-2 text-[10.5px] leading-snug text-slate-700"
                            >
                                <span
                                    class="mt-1.25 w-1 h-1 shrink-0 bg-slate-400 rounded-full"
                                ></span>
                                <span>{{ point }}</span>
                            </li>
                        </ul>

                        <div
                            v-if="
                                project.technologies &&
                                project.technologies.length
                            "
                            class="flex flex-wrap gap-0.5 mt-1 ml-4"
                        >
                            <span
                                v-for="tech in project.technologies"
                                :key="tech"
                                class="inline-flex items-center px-1 py-0 rounded text-[9px] font-medium bg-slate-100 text-slate-600"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== Personal Projects ===== -->
        <section v-if="cvDocument.projects.length" class="mb-4">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                Personal Projects
            </h2>
            <div class="space-y-2">
                <div v-for="project in cvDocument.projects" :key="project.id">
                    <p class="text-[11px] font-semibold text-slate-800">
                        {{ project.name }}
                        <span class="font-normal text-slate-500">
                            — {{ project.tagline }}
                        </span>
                    </p>
                    <p class="text-[10.5px] text-slate-600 leading-snug ml-1">
                        {{ project.description }}
                    </p>
                    <div class="flex flex-wrap gap-0.5 mt-0.5 ml-1">
                        <span
                            v-for="tech in project.technologies"
                            :key="tech"
                            class="inline-flex items-center px-1 py-0 rounded text-[9px] font-medium bg-slate-100 text-slate-600"
                        >
                            {{ tech }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===== Education ===== -->
        <section>
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                Education
            </h2>
            <div>
                <div
                    class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                >
                    <h3
                        class="font-bold text-slate-900 text-[12px] leading-tight"
                    >
                        {{ cvDocument.education.institution }}
                    </h3>
                    <span
                        class="text-[10px] font-mono text-slate-500 whitespace-nowrap"
                    >
                        {{ cvDocument.education.period }}
                    </span>
                </div>
                <div class="text-[11px] text-slate-700 mt-0.5 font-medium">
                    {{ cvDocument.education.degree }}
                </div>
                <ul class="mt-1 space-y-0.5 ml-1 text-[10.5px] text-slate-600">
                    <li
                        v-for="(line, idx) in cvDocument.education.details"
                        :key="idx"
                        class="flex items-start gap-2"
                    >
                        <span
                            class="mt-[5px] w-1 h-1 shrink-0 bg-slate-400 rounded-full"
                        ></span>
                        <span>{{ line }}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>

    <!-- Floating Export Button -->
    <ClientOnly>
        <Teleport to="body">
            <Transition
                appear
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-4"
            >
                <div
                    v-if="props.showButton"
                    class="fixed bottom-8 right-8 print:hidden z-100"
                >
                    <button
                        data-tip="Download CV"
                        class="btn btn-circle btn-lg bg-primary hover:bg-primary/90 text-white border-none shadow-xl tooltip tooltip-left"
                        @click="open()"
                    >
                        <Icon name="uil:download-alt" :size="24" />
                    </button>
                </div>
            </Transition>
            <dialog ref="dialogRef" class="modal">
                <div class="modal-box max-w-md">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div class="flex items-center gap-2 min-w-0">
                            <Icon
                                name="uil:download-alt"
                                class="text-2xl text-primary shrink-0"
                            />
                            <h3 class="font-bold text-lg truncate">
                                Download CV
                            </h3>
                        </div>
                        <form method="dialog">
                            <button
                                class="btn btn-ghost btn-sm btn-circle"
                                aria-label="Close"
                            >
                                <Icon name="uil:x" class="text-2xl" />
                            </button>
                        </form>
                    </div>
                    <div
                        class="w-full gap-2 flex flex-col justify-center items-center"
                    >
                        <button
                            class="btn btn-outline btn-block btn-primary"
                            @click="downloadCV('front')"
                        >
                            Frontend CV
                        </button>
                        <button
                            class="btn btn-outline btn-block btn-primary"
                            @click="downloadCV('full')"
                        >
                            Full-stack CV
                        </button>
                    </div>

                    <div class="divider text-xs text-slate-400">OR</div>

                    <div class="w-full space-y-3">
                        <div class="text-sm font-medium text-slate-700">
                            Generate a tailored CV
                        </div>

                        <textarea
                            v-model="jobDescription"
                            class="textarea textarea-bordered w-full text-sm"
                            rows="4"
                            placeholder="Paste the job description here and we'll optimize the CV for it..."
                        ></textarea>

                        <button
                            class="btn btn-primary btn-block"
                            :disabled="
                                !jobDescription.trim() || isGenerating
                            "
                            @click="downloadTailoredCV()"
                        >
                            <span
                                v-if="isGenerating"
                                class="loading loading-spinner loading-xs"
                            ></span>
                            <Icon
                                v-else
                                name="uil:magic"
                                class="mr-1"
                            />
                            {{ isGenerating ? "Generating..." : "Generate Tailored CV" }}
                        </button>

                        <p
                            v-if="optimizeError"
                            class="text-error text-xs text-center"
                        >
                            {{ optimizeError }}
                        </p>
                    </div>
                </div>
            </dialog>
        </Teleport>
    </ClientOnly>
</template>

<style scoped>
@page {
    margin: 0;
    size: auto;
}
.resume-wrapper {
    font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        Arial,
        sans-serif;
}

.resume-wrapper :is(h1, h2, h3, h4, h5, h6) {
    font-family: inherit;
}

@media print {
    .resume-wrapper {
        box-shadow: none;
        max-width: none;
        width: 100%;
    }
}
</style>
