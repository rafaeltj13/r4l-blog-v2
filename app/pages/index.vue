<script setup lang="ts">
import { experienceData } from '~/utils/experienceData'
import { posts } from '~/utils/postsData'
import ExperienceItem from '~/components/experience/ExperienceItem.vue'
import PostItem from '~/components/posts/PostItem.vue'

const relevantProjects = experienceData.slice(0, 3)
const relevantPosts = [...posts].reverse().slice(0, 3)

const activeSection = ref('about')

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

// Intersection Observer to update active section
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Wait for the DOM to update so we can get the scroll container
  nextTick(() => { 
    const scrollContainer = document.getElementById('scroll-container')
    
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, {
      root: scrollContainer || null, // Use the scroll container as root
      rootMargin: '-10% 0px -70% 0px', // Trigger when element is near the top
      threshold: 0
    })

    // Observe sections
    const sections = ['about', 'projects', 'posts']
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer?.observe(element)
    })
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <!-- Main container with fixed height on desktop to enable internal scrolling -->
  <div class="container mx-auto max-w-screen-xl px-4 md:px-8 py-12 lg:h-[calc(100vh-3.5rem)] lg:overflow-hidden lg:py-0">
    <div class="flex flex-col lg:flex-row gap-0 lg:gap-12 relative h-full">
      <!-- Left Column: Static Profile -->
      <aside class="w-full lg:w-[40%] flex flex-col justify-between h-auto lg:h-full lg:py-12" v-motion-slide-left>
        <div>
          <h1 class="text-4xl font-bold mb-2">Rafael de Araújo Maciel</h1>
          <h2 class="text-xl text-primary/80 mb-6">Senior Software Engineer</h2>
          <p class="text-base-content/70 leading-relaxed mb-8 max-w-md">
            I'm a full-stack developer with a passion for creating seamless user experiences. I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </div>

        <nav class="space-y-4 mb-8 lg:mb-0">
          <button 
            @click="scrollToSection('about')"
            class="block text-lg font-medium transition-colors text-left w-full"
            :class="activeSection === 'about' ? 'text-primary' : 'hover:text-primary'"
          >
            About me
          </button>
          <button 
            @click="scrollToSection('projects')"
            class="block text-lg font-medium transition-colors text-left w-full"
            :class="activeSection === 'projects' ? 'text-primary' : 'hover:text-primary'"
          >
            Relevant projects
          </button>
          <button 
            @click="scrollToSection('posts')"
            class="block text-lg font-medium transition-colors text-left w-full"
            :class="activeSection === 'posts' ? 'text-primary' : 'hover:text-primary'"
          >
            Relevant posts
          </button>
        </nav>
      </aside>

      <!-- Right Column: Scrollable Content -->
      <main 
        id="scroll-container"
        class="w-full lg:w-[60%] pt-2 lg:overflow-y-auto lg:h-full lg:py-12 lg:no-scrollbar scroll-smooth" 
        v-motion-slide-bottom
      >
        <div id="about" class="prose prose-lg max-w-none mb-16">
          <h3 class="text-2xl font-bold mb-6">About me</h3>
          <p class="mb-6">
            Welcome to my corner of the web! I'm a developer from Campina Grande, a city in Paraíba, Brazil, where my journey in web development began. At 27, I've already experienced quite an evolution in web technologies.
          </p>
          <p class="mb-6">
            My path started with classic frameworks like AngularJS and ASP.NET during my university years, but it was discovering mordern frameworks like React and Vue that truly ignited my passion for web development. Today, I focus on creating meaningful digital experiences that combine clean code with thoughtful design.
          </p>
          <p class="mb-6">
            I have 7+ years of experience specializing in full-stack web development. Advanced proficiency in modern TypeScript frameworks including React, Vue.js, Next.js, and Node.js. Successfully collaborated with global teams to build scalable solutions, demonstrating effective cross-cultural communication.
          </p>
          <p>
            In my spare time, I'm usually playing DotA 2, NBA 2k26, working out, hanging out with my girlfriend and two cats, or watching series.
          </p>
        </div>

        <div id="projects" class="mb-16">
          <h3 class="text-2xl font-bold mb-6">Relevant projects</h3>
          <div class="space-y-8">
            <ExperienceItem
              v-for="(item, index) in relevantProjects"
              :key="index"
              :experience="item"
            />
          </div>
        </div>

        <div id="posts" class="mb-16">
          <h3 class="text-2xl font-bold mb-6">Relevant posts</h3>
          <div class="space-y-8">
            <PostItem
              v-for="post in relevantPosts"
              :key="post.id"
              :post="post"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.lg\:no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.lg\:no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
