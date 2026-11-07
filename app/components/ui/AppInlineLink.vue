<script setup lang="ts">
/** A link inside running text. External links open in a new tab and show an icon. */
const props = defineProps<{
    href: string;
}>();

const isExternal = computed(() => /^https?:\/\//.test(props.href));
</script>

<template>
    <a
        :href="href"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'noopener noreferrer' : undefined"
        class="inline-link"
    >
        <slot />
        <Icon
            v-if="isExternal"
            name="uil:external-link-alt"
            :size="14"
            class="ms-0.5 align-baseline"
            aria-hidden="true"
        />
        <span v-if="isExternal" class="sr-only">{{ $t("common.opensInNewTab") }}</span>
    </a>
</template>
