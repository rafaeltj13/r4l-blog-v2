<script setup lang="ts">
/**
 * LanguageSwitcher component
 * Dropdown to switch between English (default) and Brazilian Portuguese.
 * Only UI chrome is translated — blog post content stays in its source language.
 */
const { locales, locale, setLocale, t } = useI18n();

const shortLabel = (code: string) => (code === "pt-BR" ? "PT" : "EN");

const localeOptions = computed(() =>
    locales.value.map((item) =>
        typeof item === "string"
            ? { code: item, name: shortLabel(item) }
            : { code: item.code, name: item.name ?? shortLabel(item.code) },
    ),
);

const currentShortLabel = computed(() => shortLabel(locale.value));
</script>

<template>
    <div class="dropdown dropdown-end">
        <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-square relative"
            :aria-label="t('header.language')"
            :title="t('header.language')"
        >
            <Icon name="uil:globe" :size="20" />
            <span
                class="absolute bottom-1 right-1 rounded bg-base-200 px-1 text-[9px] font-bold leading-tight"
                >{{ currentShortLabel }}</span
            >
        </div>
        <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm border border-base-200"
        >
            <li v-for="option in localeOptions" :key="option.code">
                <button
                    class="flex items-center justify-between"
                    :class="{ active: locale === option.code }"
                    @click="setLocale(option.code)"
                >
                    <span>{{ option.name }}</span>
                    <Icon
                        v-if="locale === option.code"
                        name="uil:check"
                        :size="16"
                    />
                </button>
            </li>
        </ul>
    </div>
</template>
