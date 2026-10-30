<script setup lang="ts">
import { FULL_NAME } from "~/utils/cv/data";
import { groupByCompany } from "~/utils/cv/document";
import { resolveCv } from "~/utils/cv/resolve";
import type { CvDocument } from "~/utils/cv/types";

const contentLocale = useContentLocale();

/** The page always shows the full history; downloads never change it. */
const cvDocument = computed<CvDocument>(
    () => resolveCv("all", contentLocale.value).document,
);

const groupedExperience = computed(() =>
    groupByCompany(cvDocument.value.experiences, {
        locale: contentLocale.value,
    }),
);
</script>

<template>
    <div
        class="resume-wrapper w-full max-w-3xl mx-auto bg-white shadow-xl p-6 md:p-8 print:p-0 print:shadow-none print:max-w-none text-slate-800"
    >
        <!-- ===== Header ===== -->
        <header class="mb-3 pb-2 text-center">
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
        <section class="mb-3">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-1.5 pb-1 border-b border-primary/20"
            >
                {{ $t("resume.summary") }}
            </h2>
            <p class="text-[11px] text-slate-700 leading-relaxed">
                {{ cvDocument.summary }}
            </p>
        </section>

        <!-- ===== Skills ===== -->
        <section class="mb-3">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                {{ $t("resume.skills") }}
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
        <section class="mb-3">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                {{ $t("resume.professionalExperience") }}
            </h2>

            <div class="space-y-2">
                <div
                    v-for="group in groupedExperience"
                    :key="group.name"
                    class="group"
                >
                    <!-- Job Header -->
                    <div class="mb-1">
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
                        class="mb-1.5 last:mb-0"
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
                            class="flex flex-wrap gap-0.5 mt-0.5 ml-4"
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
        <section v-if="cvDocument.projects.length" class="mb-3">
            <h2
                class="text-[10px] font-bold text-primary uppercase tracking-[0.18em] mb-2 pb-1 border-b border-primary/20"
            >
                {{ $t("resume.personalProjects") }}
            </h2>
            <div class="space-y-1.5">
                <div
                    v-for="project in cvDocument.projects"
                    :key="project.id"
                    class="mb-1.5 last:mb-0"
                >
                    <p
                        class="text-[11px] font-semibold text-slate-800 mb-0.5"
                    >
                        {{ project.name }}
                        <span class="font-normal text-slate-500">
                            — {{ project.tagline }}
                        </span>
                    </p>

                    <ul class="space-y-0.5 ml-1">
                        <li
                            class="flex items-start gap-2 text-[10.5px] leading-snug text-slate-700"
                        >
                            <span
                                class="mt-1.25 w-1 h-1 shrink-0 bg-slate-400 rounded-full"
                            ></span>
                            <span>{{ project.description }}</span>
                        </li>
                    </ul>

                    <div class="flex flex-wrap gap-0.5 mt-0.5 ml-4">
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
                {{ $t("resume.education") }}
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
                <ul class="mt-0.5 space-y-0.5 ml-1 text-[10.5px] text-slate-600">
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
