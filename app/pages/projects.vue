<script setup lang="ts">
const { t } = useI18n();

const localizedProjects = useLocalizedProjects();
const projectsData = localizedProjects;

useHead({
  title: () => t('seo.projects')
})

import ProjectItem from '~/components/projects/ProjectItem.vue'
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-motion-slide-left suppressHydrationWarning class="mb-12">
      <h1 class="text-4xl font-bold text-base-content mb-4">{{ $t('projects.title') }}</h1>
      <p class="text-base-content/60 max-w-2xl">
        {{ $t('projects.subtitle') }}
      </p>
    </div>

    <!-- Projects List -->
    <div v-motion-slide-bottom suppressHydrationWarning class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectItem
        v-for="project in projectsData"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>
