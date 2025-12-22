<script setup lang="ts">
interface Tab {
  label: string
  value: string
}

const props = defineProps<{
  tabs: Tab[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div role="tablist" class="tabs tabs-box">
    <a
      v-for="tab in tabs"
      :key="tab.value"
      role="tab"
      class="tab"
      :class="{ 'tab-active': modelValue === tab.value }"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </a>
  </div>
</template>
