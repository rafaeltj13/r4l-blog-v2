<script setup lang="ts">
import AppChip from '~/components/ui/AppChip.vue'

export interface Experience {
  title: string
  companyName: string
  technologies: string[]
  dateStart: string
  dateEnd?: string | null
  description: string
  partner?: string
}

const props = defineProps<{
  experience: Experience
}>()

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

const isPresent = computed(() => {
  if (!props.experience.dateEnd) return true
  return new Date(props.experience.dateEnd) > new Date()
})

const dateRange = computed(() => {
  const start = formatDate(props.experience.dateStart)
  const end = isPresent.value ? 'Present' : formatDate(props.experience.dateEnd!)
  return `${start} – ${end}`
})

/**
 * Split multi-line descriptions into paragraphs.
 * Handles template literal newlines and trims whitespace.
 */
const descriptionParagraphs = computed(() => {
  return props.experience.description
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
})
</script>

<template>
  <div class="group/item grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300">
    <!-- Date Range -->
    <div class="text-sm text-base-content/60 pt-1 font-mono whitespace-nowrap">
      {{ dateRange }}
    </div>

    <!-- Content -->
    <div>
      <h3 class="text-xl font-semibold text-base-content mb-2 group-hover/item:text-primary transition-colors">
        {{ experience.title }}
        <span
          v-if="experience.companyName || experience.partner"
          class="text-base-content/60 font-normal"
        >
          &ndash; {{ experience.companyName }}
          <span v-if="experience.partner">/ {{ experience.partner }}</span>
        </span>
      </h3>

      <div class="mb-4 space-y-3">
        <p
          v-for="(paragraph, idx) in descriptionParagraphs"
          :key="idx"
          class="text-base-content/80 leading-relaxed"
        >
          {{ paragraph }}
        </p>
      </div>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2">
        <AppChip
          v-for="tech in experience.technologies"
          :key="tech"
          :label="tech"
        />
      </div>
    </div>
  </div>
</template>
