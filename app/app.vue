<script setup lang="ts">
/**
 * Exposes the current locale to the document (`<html lang="...">`)
 * for accessibility and SEO.
 */
const head = useLocaleHead();
useHead(() => ({
    htmlAttrs: head.value.htmlAttrs,
    link: [...(head.value.link || [])],
    meta: [...(head.value.meta || [])],
}));
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
