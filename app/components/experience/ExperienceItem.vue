<script setup lang="ts">
import AppChip from '~/components/ui/AppChip.vue'

interface Experience {
  title: string
  companyName: string
  technologies: string[]
  dateStart: string
  dateEnd: string
  description: string
  partner?: string
}

const props = defineProps<{
  experience: Experience
}>()

const formatDateYear = (dateString: string) => {
  return new Date(dateString).getUTCFullYear()
}
</script>

<template>
  <div class="group/item grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 mb-12 hover:bg-base-content/5 p-4 rounded-box transition-colors duration-300">
    <!-- Date Range -->
    <div class="text-sm text-base-content/60 pt-1 font-mono">
      {{ formatDateYear(experience.dateStart) }} - {{ formatDateYear(experience.dateEnd) }}
    </div>

    <!-- Content -->
    <div>
      <h3 class="text-xl font-semibold text-base-content mb-2 group-hover/item:text-primary transition-colors">
        {{ experience.title }} <span v-if="experience.companyName || experience.partner" class="text-base-content/60 font-normal">- {{ experience.companyName }} <span v-if="experience.partner">/ {{ experience.partner }}</span></span>
      </h3>
      <p class="text-base-content/80 mb-4 leading-relaxed">
        {{ experience.description }}
      </p>

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
