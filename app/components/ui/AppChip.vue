<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span
    class="bg-primary/10 text-primary px-3 py-1 rounded-box text-sm font-medium transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-primary-content"
  >
    {{ label }}
  </span>
</template>
