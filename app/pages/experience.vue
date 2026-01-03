<script setup lang="ts">
import { experienceData } from '~/utils/experienceData'
import ExperienceItem from '~/components/experience/ExperienceItem.vue'
import Resume from '~/components/Resume.vue'
import AppTabs from '~/components/ui/AppTabs.vue'

const activeTab = useState('experience-active-tab', () => 'projects')

const tabs = [
  { label: 'Projects', value: 'projects' },
  { label: 'Resume', value: 'resume' },
]
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-motion-slide-left suppressHydrationWarning class="mb-12">
      <h1 class="text-4xl font-bold text-base-content mb-8">Professional Experience</h1>
      
      <div class="w-fit">
        <AppTabs
          v-model="activeTab"
          :tabs="tabs"
        />
      </div>
    </div>

    <!-- Projects Content -->
    <div v-motion-slide-bottom suppressHydrationWarning v-if="activeTab === 'projects'">
      <ExperienceItem
        v-for="(item, index) in experienceData"
        :key="index"
        :experience="item"
      />
    </div>

    <!-- Resume Content -->
    <div v-else v-motion-slide-bottom suppressHydrationWarning>
      <Resume />
    </div>
  </div>
</template>
