<script setup lang="ts">
/**
 * TheHeader component
 * Handles scroll state and displays navigation, logo, and actions.
 */
const isScrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }
  
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <header
    v-motion-fade
    class="sticky top-0 z-50 w-full border-b transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 border-base-200/40' 
        : 'bg-transparent border-transparent'
    ]"
  >
    <div class="container mx-auto flex h-14 items-center justify-between max-w-screen-xl px-4 md:px-8 ">
      <!-- Left: Logo -->
      <div class="flex flex-1 justify-start">
        <NuxtLink to="/" class="group flex items-center space-x-2">
          <span class="hidden font-bold sm:flex items-center transition-colors duration-300">
            <span class="text-primary transition-colors duration-300 group-hover:text-base-content">R4L</span>
            <span class="text-base-content transition-colors duration-300 group-hover:text-primary">.blog.v2</span>
          </span>
        </NuxtLink>
      </div>

      <!-- Center: Navigation -->
      <div class="hidden md:flex flex-1 justify-center">
        <nav class="flex items-center gap-4 text-sm font-medium">
          <NuxtLink to="/posts" class="transition-colors hover:text-primary text-base-content/60" active-class="text-primary">Posts</NuxtLink>
          <NuxtLink to="/experience" class="transition-colors hover:text-primary text-base-content/60" active-class="text-primary">Experience</NuxtLink>
          <NuxtLink to="/chat" class="transition-colors hover:text-primary text-base-content/60" active-class="text-primary">Chat</NuxtLink>
        </nav>
      </div>
      
      <!-- Right: Social Icons & Theme Toggle -->
      <div class="flex flex-1 items-center justify-end space-x-2">
        <UiAppSocialIcons />
        <UiThemeToggle />
      </div>
    </div>
  </header>
</template>