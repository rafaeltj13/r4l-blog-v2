<script setup lang="ts">
import AppChip from '~/components/ui/AppChip.vue'
import type { Project } from '~/utils/projectsData'

defineProps<{
  project: Project
}>()

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    Vue: '#41b883',
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
  }
  return colors[language] || '#8b949e'
}

const formatLastUpdated = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays <= 30) {
    return `${diffDays} days ago`
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="group/item card bg-base-100/50 hover:bg-base-content/5 border border-base-200 transition-colors duration-300 mb-8">
    <div class="card-body p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-base-content/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
          <a 
            :href="project.githubUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-xl font-bold text-base-content group-hover/item:text-primary transition-colors decoration-2 decoration-primary/30 underline-offset-4"
          >
            {{ project.name }}
          </a>
          <span class="badge badge-sm badge-outline text-xs">Public</span>
        </div>
        
        
      </div>

      <!-- Description -->
      <p class="text-base-content/70 mb-6 leading-relaxed min-h-[3rem]">
        {{ project.description }}
      </p>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-6">
        <AppChip
          v-for="tech in project.technologies"
          :key="tech"
          :label="tech"
          size="sm"
        />
      </div>

      <!-- Footer Stats -->
      <div class="flex items-center gap-4 text-sm text-base-content/60 pt-4 border-t border-base-200/50 mt-auto">
        <!-- Language -->
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: getLanguageColor(project.language) }"></span>
          <span>{{ project.language }}</span>
        </div>

        <!-- Stars -->
        <div class="flex items-center gap-1 hover:text-base-content transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>{{ project.stargazers_count }}</span>
        </div>

        <!-- Forks -->
        <div class="flex items-center gap-1 hover:text-base-content transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
          <span>{{ project.forks_count }}</span>
        </div>
        
        <!-- Updated At -->
        <div class="ml-auto text-xs">
          Updated {{ formatLastUpdated(project.updated_at) }}
        </div>
      </div>
    </div>
  </div>
</template>
