<script setup lang="ts">
import { experienceData } from "~/utils/experienceData";
import { computed } from "vue";

const props = withDefaults(
    defineProps<{
        showButton?: boolean;
    }>(),
    {
        showButton: true,
    },
);

// Easily editable header info
const fullName = "Rafael de Araújo Maciel";
const position = "Senior Software Engineer";

const contactInfo = {
    location: "João Pessoa/PB, Brazil (GMT -3)",
    phone: "+55 83 98113-1924",
    email: "rafael.damaciel@proton.me",
    linkedin: {
        label: "linkedin.com/in/rafaeldamaciel",
        url: "https://www.linkedin.com/in/rafaeldamaciel/",
    },
    github: {
        label: "github.com/rafaeltj13",
        url: "https://github.com/rafaeltj13",
    },
};

const summary =
    "Senior Software Engineer with 8+ years of expertise specializing in full-stack web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.";

const education = {
    institution: "Federal University of Campina Grande - UFCG",
    degree: "Bachelor of Computer Science",
    period: "2015 - 2019",
    details: [
        "Participation in Monitoring Projects: Programming Laboratory II",
    ],
};

// Helper to group experience by company
const groupedExperience = computed(() => {
    const groups: Record<string, any> = {};

    // Hide specific Trio entries from the resume to keep it concise
    const HIDDEN_TRIO_PARTNERS = new Set(["Optel Group", "Path"]);

    const recentExperiences = experienceData.slice(0, 7).filter((item) => {
        if (item.companyName !== "Trio") return true;
        // Hide the older Path entry (Software Engineer, Vue.js)
        // and the Optel Group entry
        if (item.partner === "Optel Group") return false;
        if (item.partner === "Studylog") return false;
        if (item.partner === "Path" && item.title === "Software Engineer")
            return false;
        return true;
    });

    recentExperiences.forEach((item) => {
        if (!groups[item.companyName]) {
            groups[item.companyName] = {
                name: item.companyName,
                title: item.title,
                location: getCompanyLocation(item.companyName),
                period: "",
                items: [],
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
            };
        }
        groups[item.companyName].items.push(item);
    });

    return Object.values(groups).map((group) => {
        const latestItem = group.items[0];
        const earliestItem = group.items[group.items.length - 1];

        const formatDate = (d: string) => {
            const date = new Date(d);
            return date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });
        };

        let period = `${formatDate(earliestItem.dateStart)} - ${formatDate(latestItem.dateEnd)}`;
        if (group.name === "Trio") {
            const hasFuture = new Date(latestItem.dateEnd) > new Date();
            if (hasFuture || latestItem.dateEnd.startsWith("2026"))
                period = "Jul 2021 - Present";
        }

        return {
            ...group,
            period,
        };
    });
});

function getCompanyLocation(name: string) {
    if (name === "Trio") return "Boston, US | Remote";
    if (name === "Xtra Holdings LLC") return "Sarasota, US | Remote";
    if (name === "Lella.co") return "Poland | Remote";
    if (
        name === "Software Practices Laboratory" ||
        name === "Software Practices Laboratory - SPLab"
    )
        return "Brazil";
    return "";
}

// Categorized Skills
const categorizedSkills = computed(() => {
    const allTechs = new Set<string>();
    experienceData.forEach((item) => {
        item.technologies?.forEach((t) => allTechs.add(t));
    });

    const categories = {
        "Frameworks & Libraries": [
            "React.js",
            "React",
            "Vue.js",
            "Next.js",
            "Nuxt.js",
            "React Native",
            "Node.js",
            "Express",
            "FastAPI",
            "NestJS",
            "Angular.js",
            "ASP.NET",
            "Pinia",
            "Storybook",
            "Apollo GraphQL",
            "GraphQL",
        ],
        Testing: ["Jest", "Vitest", "Playwright", "Maestro"],
        "Data & Cloud": [
            "MySQL",
            "MongoDB",
            "PostgreSQL",
            "SQL Server",
            "Google BigQuery",
            "Google ADK",
            "AWS",
            "Kubernetes",
            "Sequelize",
            "Stripe (Software)",
        ],
    };

    const result: Record<string, string[]> = {};
    const used = new Set<string>();

    Object.entries(categories).forEach(([cat, keywords]) => {
        const matched = Array.from(allTechs).filter((tech) => {
            if (used.has(tech)) return false;

            const isMatch = keywords.some(
                (k) =>
                    tech.toLowerCase() === k.toLowerCase() ||
                    (k === "React" && tech === "React.js") ||
                    (k === "React.js" && tech === "React"),
            );

            if (isMatch) used.add(tech);
            return isMatch;
        });

        if (matched.length > 0) {
            result[cat] = matched.sort();
        }
    });

    return result;
});

/**
 * Split a description into individual bullet points.
 * Multi-line descriptions (template literals) are split on double-newlines.
 */
function splitDescription(description: string): string[] {
    return description
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean);
}

const downloadCV = async () => {
    const element = document.querySelector(
        ".resume-wrapper",
    ) as HTMLElement | null;
    if (!element) return;

    const { default: jsPDF } = await import("jspdf");
    const { default: html2canvas } = await import("html2canvas-pro");

    // A4 at 2x scale: 210mm × 297mm → ~794px width at 96dpi
    const A4_WIDTH_PX = 794;

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: A4_WIDTH_PX,
        windowWidth: A4_WIDTH_PX,
        onclone: (_doc: Document, clonedEl: HTMLElement) => {
            // Remove interactive elements
            clonedEl.querySelectorAll("button").forEach((btn) => btn.remove());

            // Force the clone to A4-friendly sizing
            clonedEl.style.width = A4_WIDTH_PX + "px";
            clonedEl.style.maxWidth = "none";
            clonedEl.style.padding = "40px 48px";
            clonedEl.style.boxShadow = "none";
            clonedEl.style.margin = "0";

            /*
             * Workaround for html2canvas-pro word-spacing bug:
             * html2canvas's fast text path uses ctx.measureText() which
             * returns different widths than CSS layout, causing word
             * collisions. Setting an explicit non-default letter-spacing
             * on every text-containing element forces the per-character
             * rendering path that respects real glyph widths.
             */
            const allEls = clonedEl.querySelectorAll<HTMLElement>("*");
            allEls.forEach((el) => {
                el.style.letterSpacing = "0.01px";
            });
            clonedEl.style.letterSpacing = "0.01px";
        },
    });

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Scale to fit width, then paginate if needed
    const scaledWidth = pdfWidth;
    const scaledHeight = (imgHeight * pdfWidth) / imgWidth;

    if (scaledHeight <= pdfHeight) {
        // Fits on one page
        pdf.addImage(imgData, "JPEG", 0, 0, scaledWidth, scaledHeight);
    } else {
        // Multi-page: slice the canvas into page-sized chunks
        const pageCanvasHeight = (pdfHeight / pdfWidth) * imgWidth;
        const totalPages = Math.ceil(imgHeight / pageCanvasHeight);

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            const srcY = i * pageCanvasHeight;
            const srcH = Math.min(pageCanvasHeight, imgHeight - srcY);
            const destH = (srcH * pdfWidth) / imgWidth;

            // Create a temporary canvas for this page slice
            const pageCanvas = document.createElement("canvas");
            pageCanvas.width = imgWidth;
            pageCanvas.height = srcH;
            const ctx = pageCanvas.getContext("2d")!;
            ctx.drawImage(
                canvas,
                0,
                srcY,
                imgWidth,
                srcH,
                0,
                0,
                imgWidth,
                srcH,
            );

            const pageData = pageCanvas.toDataURL("image/jpeg", 0.98);
            pdf.addImage(pageData, "JPEG", 0, 0, pdfWidth, destH);
        }
    }

    pdf.save("Rafael_Maciel_CV.pdf");
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
                {{ fullName }}
            </h1>
            <p class="text-[11px] text-slate-700 font-medium mt-0.5">
                {{ position }}
            </p>

            <!-- Contact: row 1 (location, phone, email) -->
            <div
                class="mt-1.5 flex flex-nowrap items-center justify-center gap-x-2 text-[10px] text-slate-600 whitespace-nowrap"
            >
                <span>{{ contactInfo.location }}</span>
                <span class="text-slate-300">|</span>
                <a
                    :href="'tel:' + contactInfo.phone"
                    class="hover:text-primary transition-colors"
                    >{{ contactInfo.phone }}</a
                >
                <span class="text-slate-300">|</span>
                <a
                    :href="'mailto:' + contactInfo.email"
                    class="hover:text-primary transition-colors"
                    >{{ contactInfo.email }}</a
                >
            </div>

            <!-- Contact: row 2 (linkedin, github) -->
            <div
                class="mt-0.5 flex flex-nowrap items-center justify-center gap-x-2 text-[10px] whitespace-nowrap"
            >
                <a
                    :href="contactInfo.linkedin.url"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                    >{{ contactInfo.linkedin.label }}</a
                >
                <span class="text-slate-300">|</span>
                <a
                    :href="contactInfo.github.url"
                    target="_blank"
                    rel="noopener"
                    class="text-primary hover:underline"
                    >{{ contactInfo.github.label }}</a
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
                {{ summary }}
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
                    v-for="(items, category) in categorizedSkills"
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
                        :key="idx"
                        class="mb-2 last:mb-0"
                    >
                        <p
                            v-if="project.partner"
                            class="text-[11px] font-semibold text-slate-800 mb-0.5"
                        >
                            {{ project.partner }}
                        </p>

                        <ul
                            class="list-disc list-outside ml-4 space-y-0 marker:text-slate-400"
                        >
                            <li
                                v-for="(point, pIdx) in splitDescription(
                                    project.description,
                                )"
                                :key="pIdx"
                                class="text-[10.5px] leading-snug text-slate-700 pl-0.5"
                            >
                                {{ point }}
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
                        {{ education.institution }}
                    </h3>
                    <span
                        class="text-[10px] font-mono text-slate-500 whitespace-nowrap"
                    >
                        {{ education.period }}
                    </span>
                </div>
                <div class="text-[11px] text-slate-700 mt-0.5 font-medium">
                    {{ education.degree }}
                </div>
                <ul
                    class="list-disc list-outside ml-4 mt-1 space-y-0 text-[10.5px] text-slate-600 marker:text-primary/60"
                >
                    <li v-for="(line, idx) in education.details" :key="idx">
                        {{ line }}
                    </li>
                </ul>
            </div>
        </section>
    </div>

    <!-- Floating Export Button -->
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
                v-if="showButton"
                class="fixed bottom-8 right-8 print:hidden z-[100]"
            >
                <button
                    @click="downloadCV"
                    class="btn btn-circle btn-lg bg-primary hover:bg-primary/90 text-white border-none shadow-xl tooltip tooltip-left"
                    data-tip="Download CV"
                >
                    <Icon name="uil:download-alt" :size="24" />
                </button>
            </div>
        </Transition>
    </Teleport>
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
@media print {
    .resume-wrapper {
        box-shadow: none;
        max-width: none;
        width: 100%;
    }
}
</style>
