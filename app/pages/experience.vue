<script setup lang="ts">
import { experienceData } from '~/utils/experienceData'
import ExperienceItem from '~/components/experience/ExperienceItem.vue'
import AppTabs from '~/components/ui/AppTabs.vue'

const activeTab = useState('experience-active-tab', () => 'projects')

const tabs = [
  { label: 'Projects', value: 'projects' },
  { label: 'Resume', value: 'resume' },
]
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-motion-slide-left class="mb-12">
      <h1 class="text-4xl font-bold text-base-content mb-8">Professional Experience</h1>
      
      <div class="w-fit">
        <AppTabs
          v-model="activeTab"
          :tabs="tabs"
        />
      </div>
    </div>

    <!-- Projects Content -->
    <div v-motion-slide-bottom v-if="activeTab === 'projects'">
      <ExperienceItem
        v-for="(item, index) in experienceData"
        :key="index"
        :experience="item"
      />
    </div>

    <!-- Resume Placeholder -->
    <div v-else class="text-center py-20 text-gray-400">
      <p class="text-lg">Projects showcase coming soon...</p>
    </div>
  </div>
</template>
