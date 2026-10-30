<script setup lang="ts">
import { exportCv, type CvSectionLabels } from "~/utils/cv/export";
import { resolveCv } from "~/utils/cv/resolve";
import type { CvPresetId, CvSelection } from "~/utils/cv/types";
import { useTailoredCv } from "~/composables/useTailoredCv";

/**
 * Floating "Download CV" button + dialog: the two Presets and the Tailored
 * CV form. The only caller of CV Export; the page CV never changes.
 */
const { dialogRef, open, close } = useDialog();
const { t } = useI18n();
const contentLocale = useContentLocale();

const {
    jobDescription,
    isGenerating,
    optimizeError,
    tailoredSelection,
    generateTailoredSelection,
    resetTailored,
} = useTailoredCv();

type DownloadId = Exclude<CvPresetId, "all"> | "tailored";
const exporting = ref<DownloadId | null>(null);
const exportError = ref<string | null>(null);
const busy = computed(() => exporting.value !== null || isGenerating.value);

const sectionLabels = (): CvSectionLabels => ({
    summary: t("resume.summary"),
    skills: t("resume.skills"),
    professionalExperience: t("resume.professionalExperience"),
    personalProjects: t("resume.personalProjects"),
    education: t("resume.education"),
});

const download = async (
    id: DownloadId,
    choice: Exclude<CvPresetId, "all"> | CvSelection,
): Promise<boolean> => {
    exporting.value = id;
    exportError.value = null;
    try {
        const { document, filename } = resolveCv(choice, contentLocale.value);
        await exportCv(document, filename, sectionLabels());
        return true;
    } catch (err: unknown) {
        console.error("CV export error:", err);
        exportError.value = t("resume.exportError");
        return false;
    } finally {
        exporting.value = null;
    }
};

const downloadPreset = async (id: Exclude<CvPresetId, "all">) => {
    if (await download(id, id)) close();
};

/** Generate once, then keep the result so "Download again" is free. */
const downloadTailored = async () => {
    const selection =
        tailoredSelection.value ?? (await generateTailoredSelection());
    if (selection) await download("tailored", selection);
};

// Native close covers the X button, Esc, and close(): drop the result then.
const onDialogClose = () => {
    resetTailored();
    exportError.value = null;
};
</script>

<template>
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
                <div class="fixed bottom-8 right-8 print:hidden z-100">
                    <button
                        :data-tip="$t('resume.downloadCv')"
                        class="btn btn-circle btn-lg bg-primary hover:bg-primary/90 text-white border-none shadow-xl tooltip tooltip-left"
                        @click="open()"
                    >
                        <Icon name="uil:download-alt" :size="24" />
                    </button>
                </div>
            </Transition>
            <dialog ref="dialogRef" class="modal" @close="onDialogClose">
                <div class="modal-box max-w-md">
                    <div class="flex items-start justify-between gap-3 mb-4">
                        <div class="flex items-center gap-2 min-w-0">
                            <Icon
                                name="uil:download-alt"
                                class="text-2xl text-primary shrink-0"
                            />
                            <h3 class="font-bold text-lg truncate">
                                {{ $t("resume.downloadCv") }}
                            </h3>
                        </div>
                        <form method="dialog">
                            <button
                                class="btn btn-ghost btn-sm btn-circle"
                                :aria-label="$t('common.close')"
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
                            :disabled="busy"
                            @click="downloadPreset('front')"
                        >
                            <span
                                v-if="exporting === 'front'"
                                class="loading loading-spinner loading-xs"
                            ></span>
                            {{ $t("resume.frontendCv") }}
                        </button>
                        <button
                            class="btn btn-outline btn-block btn-primary"
                            :disabled="busy"
                            @click="downloadPreset('full')"
                        >
                            <span
                                v-if="exporting === 'full'"
                                class="loading loading-spinner loading-xs"
                            ></span>
                            {{ $t("resume.fullstackCv") }}
                        </button>
                    </div>

                    <div class="divider text-xs text-slate-400">{{ $t("resume.or") }}</div>

                    <div class="w-full space-y-3">
                        <div class="text-sm font-medium text-slate-700">
                            {{ $t("resume.tailoredTitle") }}
                        </div>

                        <textarea
                            v-model="jobDescription"
                            class="textarea textarea-bordered w-full text-sm"
                            rows="4"
                            :placeholder="$t('resume.tailoredPlaceholder')"
                        ></textarea>

                        <div
                            v-if="tailoredSelection"
                            class="rounded-box border border-base-300 p-3 space-y-1"
                        >
                            <div class="text-xs text-slate-500">
                                {{ $t("resume.tailoredAs") }}
                            </div>
                            <div class="text-sm font-semibold">
                                {{ tailoredSelection.position }}
                            </div>
                            <p class="text-xs text-slate-600 line-clamp-3">
                                {{ tailoredSelection.summary }}
                            </p>
                        </div>

                        <button
                            class="btn btn-primary btn-block"
                            :disabled="!jobDescription.trim() || busy"
                            @click="downloadTailored()"
                        >
                            <span
                                v-if="isGenerating || exporting === 'tailored'"
                                class="loading loading-spinner loading-xs"
                            ></span>
                            <Icon
                                v-else
                                :name="tailoredSelection ? 'uil:download-alt' : 'uil:magic'"
                                class="mr-1"
                            />
                            {{
                                isGenerating
                                    ? $t("resume.generating")
                                    : tailoredSelection
                                      ? $t("resume.downloadAgain")
                                      : $t("resume.generateTailored")
                            }}
                        </button>

                        <p
                            v-if="optimizeError || exportError"
                            class="text-error text-xs text-center"
                        >
                            {{ optimizeError ?? exportError }}
                        </p>
                    </div>
                </div>
            </dialog>
        </Teleport>
    </ClientOnly>
</template>
