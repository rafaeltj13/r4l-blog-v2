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

const contactInfo = {
    location: "João Pessoa/PB, Brazil (GMT -3)",
    phone: "+55 83 98113-1924",
    email: "rafael.damaciel@proton.me",
};

const education = {
    institution: "Federal University of Campina Grande - UFCG",
    degree: "Bachelor of Computer Science", // Inferred from "Bachelor" and typical UFCG degree
    period: "2015 - 2019",
    details: [
        "Participation in Monitoring Projects:",
        "Programming Laboratory II",
    ],
};

const header = {
    name: "Rafael de Araújo Maciel",
    links: [
        {
            text: "https://www.linkedin.com/in/rafael-de-ara%C3%BAjo-14b5b1117/",
            url: "https://www.linkedin.com/in/rafael-de-ara%C3%BAjo-14b5b1117/",
        },
        {
            text: "https://github.com/rafaeltj13",
            url: "https://github.com/rafaeltj13",
        },
    ],
    summary:
        "Senior Software Engineer with 7+ years of expertise specializing in full-stack web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.",
};

// Helper to group experience by company
const groupedExperience = computed(() => {
    const groups: Record<string, any> = {};

    // Use only the last 7 experiences for the resume
    const recentExperiences = experienceData.slice(0, 7);

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
        const dates = group.items.map((i: any) => ({
            start: new Date(i.dateStart),
            end: new Date(i.dateEnd),
        }));
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
                period = "Jul/2021 - Current";
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

    ["TypeScript", "JavaScript", "Git"].forEach((s) => allTechs.add(s));

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
            "Angular.js",
            "ASP.NET",
            "Pinia",
            "Storybook",
        ],
        Testing: ["Jest", "Vitest", "Playwright", "Maestro"],
        "Data & Cloud": [
            "MySQL",
            "MongoDB",
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

    // Sort into categories
    Object.entries(categories).forEach(([cat, keywords]) => {
        // keywords are candidates. We check if 'allTechs' has them.
        // Also check if 'allTechs' has items that CONTAIN these keywords? No, precise match or close match.
        // experienceData usually has formatting; e.g. "React.js" vs "React".
        // Let's filter allTechs based on our categorization lists.

        const matched = Array.from(allTechs).filter((tech) => {
            // simplified normalization for check
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

    // Add "Other" if needed, or explicitly ensure important ones are present.
    // Let's assume the mapping covers most.

    return result;
});

// Primary color for PDF (replacing oklch)
const PRIMARY_COLOR = "#1c4e80";

const downloadCV = async () => {
    const element = document.querySelector(
        ".resume-wrapper",
    ) as HTMLElement | null;
    if (!element) return;

    // Dynamically import libraries only on client side
    const { default: jsPDF } = await import("jspdf");
    const { default: html2canvas } = await import("html2canvas");

    // Create an isolated iframe to avoid oklch color issues
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.left = "-9999px";
    iframe.style.top = "0";
    iframe.style.width = "800px";
    iframe.style.height = "1200px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
        document.body.removeChild(iframe);
        return;
    }

    // Build complete HTML with inline styles (no external CSS that might have oklch)
    const buildStyledHTML = () => {
        const clone = element.cloneNode(true) as HTMLElement;
        const buttons = clone.querySelectorAll('button');
        buttons.forEach(btn => btn.remove());

        return `
<!DOCTYPE html>
<html>
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.5;
            font-size: 14px;
        }

        /* Resume wrapper */
        .resume-wrapper {
            padding: 24px 32px;
            max-width: 100%;
            background: #ffffff;
        }

        /* Header */
        header {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            margin-bottom: 24px !important;
            padding-bottom: 20px !important;
            border-bottom: 1px solid #e5e7eb !important;
        }

        header > div:first-child {
            width: 60% !important;
            margin-right: 24px !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
        }

        header > div:last-child {
            width: 40% !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            text-align: right !important;
            padding-right: 48px !important;
            margin-top: 0 !important;
            padding-top: 15px !important;
        }

        /* Contact links - each on own line */
        header > div:last-child a {
            display: block !important;
            text-align: right !important;
            white-space: nowrap !important;
            margin-bottom: 3px !important;
        }

        header > div:last-child > div {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            gap: 2px !important;
        }

        /* Typography */
        h1 {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            color: ${PRIMARY_COLOR} !important;
            margin-bottom: 20px !important;
            letter-spacing: -0.025em;
            line-height: 1 !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
        }

        h2 {
            font-size: 1.25rem !important;
            font-weight: 700 !important;
            color: ${PRIMARY_COLOR} !important;
            margin-bottom: 14px !important;
        }

        h3 {
            font-size: 1rem !important;
            font-weight: 700 !important;
            color: #0f172a !important;
        }

        /* Main layout - Flexbox instead of Grid */
        .grid {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            width: 100% !important;
        }

        /* Left column */
        [class*="col-span-8"] {
            width: 65% !important;
            display: flex !important;
            flex-direction: column !important;
            padding-right: 32px !important;
            padding-left: 0 !important;
        }

        /* Right column */
        [class*="col-span-4"] {
            width: 35% !important;
            display: flex !important;
            flex-direction: column !important;
            padding-left: 0 !important;
        }

        /* Right column sections spacing */
        [class*="col-span-4"] > section {
            margin-bottom: 32px !important;
        }

        /* Job groups */
        .group {
            margin-bottom: 16px;
        }

        /* Job title row - title and period on same line */
        [class*="sm:flex-row"] {
            display: flex !important;
            flex-direction: row !important;
            align-items: baseline !important;
            justify-content: space-between !important;
            margin-bottom: 2px !important;
        }

        /* Show desktop period */
        [class*="hidden"][class*="sm:block"] {
            display: block !important;
        }

        /* Hide mobile period */
        [class*="sm:hidden"] {
            display: none !important;
        }

        /* Period styling */
        [class*="font-mono"][class*="text-xs"] {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace !important;
            font-size: 11px !important;
            color: #64748b !important;
            white-space: nowrap !important;
        }

        /* Company row */
        [class*="flex"][class*="items-center"][class*="text-sm"] {
            display: flex !important;
            align-items: center !important;
            font-size: 13px !important;
            color: #475569 !important;
            font-weight: 500 !important;
            margin-bottom: 8px !important;
        }

        /* Separator */
        [class*="mx-2"][class*="text-slate-300"] {
            margin: 0 8px !important;
            color: #cbd5e1 !important;
        }

        /* Location text */
        [class*="text-slate-500"][class*="font-normal"] {
            color: #64748b !important;
            font-weight: 400 !important;
        }

        /* Project list */
        ul[class*="list-disc"] {
            list-style-type: none !important;
            padding-left: 0 !important;
            margin-left: 0 !important;
        }

        ul[class*="list-disc"] > li {
            margin-bottom: 14px !important;
            color: #475569 !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
            padding-left: 14px !important;
            position: relative !important;
        }

        /* Custom bullet point for list items */
        ul[class*="list-disc"] > li::before {
            content: "•" !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            color: ${PRIMARY_COLOR} !important;
            font-size: 14px !important;
        }

        /* Description text block */
        ul[class*="list-disc"] > li > span.block,
        ul[class*="list-disc"] > li > span:first-child {
            display: block !important;
            margin-bottom: 6px !important;
        }

        /* Space between job items */
        [class*="space-y-10"] > * + * {
            margin-top: 20px !important;
        }

        [class*="space-y-4"] > * + * {
            margin-top: 10px !important;
        }

        [class*="flex-wrap"] {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 0 !important;
            margin-top: 6px !important;
            margin-bottom: 2px !important;
            align-items: center !important;
            justify-content: flex-start !important;
        }

        /* Tech badges */
        [class*="bg-slate-100"] {
            display: inline-block !important;
            background-color: transparent !important;
            border: 1px solid #cbd5e1 !important;
            color: #475569 !important;
            padding-top: 0px !important;
            padding-bottom: 4px !important;
            padding-left: 6px !important;
            padding-right: 6px !important;
            border-radius: 4px !important;
            font-size: 10px !important;
            font-weight: 600 !important;
            margin-right: 6px !important;
            margin-bottom: 6px !important;
            box-sizing: border-box !important;
            white-space: nowrap !important;
            line-height: normal !important;
            height: auto !important;
            vertical-align: middle !important;
        }

        /* Ensure no bullets appear on badge spans */
        [class*="flex-wrap"] > span::before {
            content: none !important;
            display: none !important;
        }

        /* Sidebar sections border */
        [class*="border-l-2"][class*="border-primary"] {
            border-left: 2px solid ${PRIMARY_COLOR}40 !important;
            padding-left: 10px !important;
            padding-top: 2px !important;
            padding-bottom: 2px !important;
            margin-left: 0 !important;
        }

        /* Skills category */
        [class*="gap-6"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 14px !important;
        }

        /* Skills category title */
        [class*="uppercase"][class*="tracking-wide"] {
            font-weight: 700 !important;
            color: #0f172a !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            margin-bottom: 4px !important;
        }

        /* Skills list text */
        [class*="text-sm"][class*="text-slate-600"][class*="leading-relaxed"] {
            color: #475569 !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
        }

        /* Education institution */
        [class*="font-bold"][class*="text-slate-900"][class*="leading-tight"] {
            font-weight: 700 !important;
            color: #0f172a !important;
            line-height: 1.3 !important;
            font-size: 14px !important;
        }

        /* Education degree */
        [class*="text-sm"][class*="text-slate-700"][class*="font-medium"] {
            font-size: 13px !important;
            color: #334155 !important;
            margin-top: 6px !important;
            font-weight: 500 !important;
        }

        /* Education period */
        [class*="text-xs"][class*="text-slate-500"][class*="font-mono"] {
            font-size: 11px !important;
            color: #64748b !important;
            margin-top: 2px !important;
            margin-bottom: 10px !important;
            font-family: ui-monospace, SFMono-Regular, monospace !important;
        }

        /* Education details list */
        ul[class*="list-none"] {
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        ul[class*="list-none"] li {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            font-size: 13px !important;
            color: #475569 !important;
            margin-bottom: 4px !important;
            line-height: 1.5 !important;
        }

        /* Education bullet - small dot */
        [class*="w-1"][class*="h-1"][class*="bg-primary"] {
            width: 5px !important;
            height: 5px !important;
            min-width: 5px !important;
            max-width: 5px !important;
            background-color: ${PRIMARY_COLOR} !important;
            border-radius: 50% !important;
            margin-top: 6px !important;
            flex-shrink: 0 !important;
            display: inline-block !important;
        }

        /* Contact info */
        [class*="font-mono"][class*="text-sm"] {
            font-family: ui-monospace, SFMono-Regular, monospace !important;
            font-size: 12px !important;
        }

        /* Links */
        a {
            text-decoration: none !important;
        }

        a[class*="text-primary"] {
            color: ${PRIMARY_COLOR} !important;
        }

        a[class*="text-slate-500"] {
            color: #64748b !important;
        }

        /* Location text */
        p[class*="text-slate-400"] {
            color: #94a3b8 !important;
            margin-top: 4px !important;
        }

        /* Summary text */
        [class*="text-slate-600"][class*="text-sm"][class*="leading-relaxed"] {
            color: #475569 !important;
            font-size: 13px !important;
            line-height: 1.6 !important;
        }

        /* Contact links container */
        header [class*="flex-col"][class*="items-end"] {
            align-items: flex-end !important;
        }

        /* General text colors */
        [class*="text-slate-800"] { color: #1e293b !important; }
        [class*="text-slate-700"] { color: #334155 !important; }
        [class*="text-slate-600"] { color: #475569 !important; }
        [class*="text-slate-500"] { color: #64748b !important; }
        [class*="text-slate-400"] { color: #94a3b8 !important; }
        [class*="text-slate-300"] { color: #cbd5e1 !important; }
        [class*="text-slate-900"] { color: #0f172a !important; }

        /* Primary text */
        [class*="text-primary"]:not(a) {
            color: ${PRIMARY_COLOR} !important;
        }
    </style>
</head>
<body>
    ${clone.outerHTML}
</body>
</html>`;
    };

    // Write HTML to iframe
    iframeDoc.open();
    iframeDoc.write(buildStyledHTML());
    iframeDoc.close();

    // Wait for iframe to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    const iframeElement = iframeDoc.querySelector(
        ".resume-wrapper",
    ) as HTMLElement;
    if (!iframeElement) {
        document.body.removeChild(iframe);
        return;
    }

    try {
        // Render to canvas
        const canvas = await html2canvas(iframeElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        // Create PDF
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
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;

        pdf.addImage(
            imgData,
            "JPEG",
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio,
        );
        pdf.save("Rafael_Maciel_CV.pdf");
    } finally {
        // Clean up
        document.body.removeChild(iframe);
    }
};
</script>

<template>
    <div
        class="resume-wrapper w-full max-w-5xl mx-auto bg-white shadow-xl p-8 md:p-12 print:p-0 print:shadow-none print:max-w-none text-slate-800"
    >
        <!-- Top Header -->
        <header
            class="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-gray-200 pb-8"
        >
            <!-- Name & Title -->
            <div class="max-w-2xl">
                <h1 class="text-5xl font-bold text-primary mb-4 tracking-tight">
                    {{ header.name }}
                </h1>
                <div class="text-slate-600 text-sm leading-relaxed max-w-xl">
                    {{ header.summary }}
                </div>
            </div>

            <!-- Contact Info -->
            <div
                class="flex flex-col items-start md:items-end gap-1.5 text-sm font-mono mt-6 md:mt-1 shrink-0"
            >
                <a
                    :href="'mailto:' + contactInfo.email"
                    class="text-slate-500 hover:text-primary transition-colors"
                    >{{ contactInfo.email }}</a
                >
                <a
                    :href="'tel:' + contactInfo.phone"
                    class="text-slate-500 hover:text-primary transition-colors"
                    >{{ contactInfo.phone }}</a
                >

                <div class="flex flex-col items-start md:items-end">
                    <a
                        v-for="link in header.links"
                        :key="link.url"
                        :href="link.url"
                        target="_blank"
                        class="text-primary hover:text-primary/80 hover:underline transition-colors block max-w-[200px] md:max-w-none truncate md:overflow-visible md:whitespace-normal text-right"
                    >
                        {{
                            link.text.includes("linkedin")
                                ? "linkedin.com/in/rafael-de-araujo"
                                : link.text
                                      .replace(/^https?:\/\/(www\.)?/, "")
                                      .replace(/\/$/, "")
                        }}
                    </a>
                </div>

                <p class="text-slate-400 mt-1">{{ contactInfo.location }}</p>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
            <!-- Left Column (Main Experience) - 66% width -->
            <div class="md:col-span-8 flex flex-col gap-10">
                <!-- Experience Section -->
                <section>
                    <h2
                        class="text-2xl font-bold text-primary mb-6 flex items-center gap-2"
                    >
                        Relevant Experience
                    </h2>

                    <div class="space-y-10">
                        <div
                            v-for="group in groupedExperience"
                            :key="group.name"
                            class="group"
                        >
                            <!-- Job Header -->
                            <div class="mb-3">
                                <div
                                    class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1"
                                >
                                    <h3
                                        class="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors"
                                    >
                                        {{ group.title }}
                                    </h3>
                                    <span
                                        class="text-xs font-mono text-slate-500 whitespace-nowrap hidden sm:block"
                                        >{{ group.period }}</span
                                    >
                                </div>
                                <div
                                    class="flex items-center text-sm text-slate-600 font-medium"
                                >
                                    <span>{{ group.name }}</span>
                                    <span
                                        v-if="group.location"
                                        class="mx-2 text-slate-300"
                                        >|</span
                                    >
                                    <span
                                        v-if="group.location"
                                        class="text-slate-500 font-normal"
                                        >{{ group.location }}</span
                                    >
                                    <!-- Mobile Period -->
                                    <span
                                        class="sm:hidden ml-auto text-xs font-mono text-slate-500"
                                        >{{ group.period }}</span
                                    >
                                </div>
                            </div>

                            <!-- Projects List -->
                            <ul
                                class="list-disc list-outside ml-4 space-y-4 marker:text-primary/50"
                            >
                                <li
                                    v-for="(project, idx) in group.items"
                                    :key="idx"
                                    class="text-sm leading-relaxed text-slate-600 pl-1"
                                >
                                    <span class="block mb-1">{{
                                        project.description
                                    }}</span>
                                    <div
                                        v-if="
                                            project.technologies &&
                                            project.technologies.length
                                        "
                                        class="flex flex-wrap gap-1 mt-1.5 opacity-90"
                                    >
                                        <span
                                            v-for="tech in project.technologies"
                                            :key="tech"
                                            class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                                        >
                                            {{ tech }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Right Column (Sidebar) - 33% width -->
            <div class="md:col-span-4 flex flex-col gap-10">
                <!-- Skills -->
                <section>
                    <h2 class="text-2xl font-bold text-primary mb-6">Skills</h2>

                    <div class="border-l-2 border-primary/20 pl-4 py-1">
                        <div class="flex flex-col gap-6">
                            <div
                                v-for="(items, category) in categorizedSkills"
                                :key="category"
                            >
                                <h3
                                    class="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wide opacity-90"
                                >
                                    {{ category }}
                                </h3>
                                <div class="flex flex-wrap gap-x-1.5 gap-y-1">
                                    <span
                                        class="text-sm text-slate-600 leading-relaxed"
                                    >
                                        {{ items.join(", ") }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Education -->
                <section>
                    <h2 class="text-2xl font-bold text-primary mb-6">
                        Education
                    </h2>

                    <div class="border-l-2 border-primary/20 pl-4 py-1">
                        <h3 class="font-bold text-slate-900 leading-tight">
                            {{ education.institution }}
                        </h3>
                        <div class="text-sm text-slate-700 mt-2 font-medium">
                            {{ education.degree }}
                        </div>
                        <div class="text-xs text-slate-500 mt-1 mb-3 font-mono">
                            {{ education.period }}
                        </div>
                        <ul class="list-none space-y-1 text-sm text-slate-600">
                            <li
                                v-for="(line, idx) in education.details"
                                :key="idx"
                                class="flex items-center gap-2"
                            >
                                <span
                                    class="mt-1.5 w-1 h-1 bg-primary rounded-full shrink-0"
                                ></span>
                                <span>{{ line }}</span>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
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
/* For print PDF accuracy */
@media print {
    .resume-wrapper {
        box-shadow: none;
        max-width: none;
        width: 100%;
    }
}
</style>
