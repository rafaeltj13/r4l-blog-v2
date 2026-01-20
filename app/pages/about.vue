<script setup lang="ts">
useHead({
  title: 'R4L - About This Site'
})

const technologies = [
  {
    name: 'Nuxt 4',
    icon: 'simple-icons:nuxtdotjs',
    description: 'The Vue.js meta-framework that powers this blog. Nuxt provides file-based routing, server-side rendering, and an excellent developer experience out of the box.',
    why: 'Perfect for content-focused sites like blogs. The hybrid rendering modes and automatic code-splitting ensure fast page loads, while the file-based routing makes adding new pages effortless.'
  },
  {
    name: 'Vue 3',
    icon: 'simple-icons:vuedotjs',
    description: 'A progressive JavaScript framework for building user interfaces with the Composition API and reactivity system.',
    why: 'Vue\'s gentle learning curve and excellent documentation make it ideal for personal projects. The Composition API allows for clean, reusable logic without the complexity of larger frameworks.'
  },
  {
    name: 'Bun',
    icon: 'simple-icons:bun',
    description: 'A fast all-in-one JavaScript runtime and package manager that replaces Node.js and npm.',
    why: 'Significantly faster than npm for installing dependencies and running scripts. The built-in bundler and test runner reduce the need for additional tooling.'
  },
  {
    name: 'Tailwind CSS 4',
    icon: 'simple-icons:tailwindcss',
    description: 'A utility-first CSS framework that enables rapid UI development with pre-built classes.',
    why: 'Speeds up development significantly for solo projects. No need to context-switch between files or come up with class names. The new v4 uses CSS variables for theming, making it even more powerful.'
  },
  {
    name: 'DaisyUI',
    icon: 'simple-icons:daisyui',
    description: 'A component library built on top of Tailwind CSS that provides beautiful, semantic UI components.',
    why: 'Adds ready-to-use components like buttons, cards, and modals without sacrificing customization. The theme system makes it easy to switch between light and dark modes.'
  },
  {
    name: 'TypeScript',
    icon: 'simple-icons:typescript',
    description: 'A strongly typed programming language that builds on JavaScript, providing better tooling and catching errors at compile time.',
    why: 'Type safety makes refactoring confident and reduces runtime bugs. The developer experience with autocomplete and inline documentation is invaluable for maintaining code long-term.'
  },
  {
    name: 'OpenAI',
    icon: 'simple-icons:openai',
    description: 'Powers the Chat feature, allowing visitors to have AI-powered conversations about my experience and projects.',
    why: 'Adds an interactive element to the portfolio. The API is easy to integrate and provides a unique way for visitors to learn about my background.'
  },
  {
    name: 'Vercel',
    icon: 'simple-icons:vercel',
    description: 'A cloud platform for deploying and hosting web applications with automatic CI/CD, edge functions, and global CDN.',
    why: 'Zero-configuration deployments for Nuxt apps. Just push to GitHub and the site is live. The generous free tier is perfect for personal projects.'
  }
]
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-motion-slide-left suppressHydrationWarning class="mb-12">
      <h1 class="text-4xl font-bold text-base-content mb-4">About This Site</h1>
      <p class="text-base-content/60 max-w-2xl">
        A look at the technologies powering this blog.
      </p>
    </div>

    <div v-motion-slide-bottom suppressHydrationWarning class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="tech in technologies" 
        :key="tech.name"
        class="card bg-base-200/50 hover:bg-base-200 transition-colors duration-300"
      >
        <div class="card-body">
          <div class="flex items-center gap-3 mb-2">
            <Icon :name="tech.icon" class="text-primary text-2xl" />
            <h3 class="card-title text-lg">{{ tech.name }}</h3>
          </div>
          <p class="text-base-content/70 text-sm mb-3">{{ tech.description }}</p>
          <div class="bg-primary/10 rounded-lg p-3">
            <p class="text-sm">
              <span class="font-semibold text-primary">Why it's great:</span> 
              {{ tech.why }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
