<script setup lang="ts">
import { experienceData } from '~/utils/experienceData'
import ExperienceItem from '~/components/experience/ExperienceItem.vue'
import Resume from '~/components/Resume.vue'
import AppTabs from '~/components/ui/AppTabs.vue'

const route = useRoute()
const router = useRouter()

const validTabs = ['projects', 'resume']

// Get initial tab from URL hash or default to 'projects'
const getTabFromHash = (): string => {
  const hash = route.hash
  if (hash) {
    const params = new URLSearchParams(hash.slice(1)) // Remove the '#'
    const tabParam = params.get('tab')
    if (tabParam && validTabs.includes(tabParam)) {
      return tabParam
    }
  }
  return 'projects'
}

const activeTab = useState('experience-active-tab', () => getTabFromHash())

// Sync URL hash when tab changes
watch(activeTab, (newTab) => {
  router.replace({ hash: `#tab=${newTab}` })
})

// Initialize the hash if not present
onMounted(() => {
  if (!route.hash) {
    router.replace({ hash: `#tab=${activeTab.value}` })
  } else {
    // Sync state with URL on mount (for SSR/navigation)
    activeTab.value = getTabFromHash()
  }
})

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
