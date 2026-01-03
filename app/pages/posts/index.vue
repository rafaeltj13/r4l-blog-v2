<script setup lang="ts">
import { posts as postsData } from '~/utils/postsData'

const { data: posts } = await useAsyncData('posts', async () => {
  return postsData
})
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header Section -->
      <div v-motion-slide-left suppressHydrationWarning class="mb-12">
        <h1 class="text-4xl font-bold text-base-content mb-8">Blog</h1>
      </div>

      <!-- Posts Grid -->
      <div v-motion-slide-bottom class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <NuxtLink 
          v-for="post in posts" 
          :key="post.id"
          :to="`/posts/${post.id}`"
          class="group card bg-base-100 shadow-xl border border-base-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Image Container -->
          <figure class="relative h-64 overflow-hidden">
            <NuxtImg
              :src="`/images/${post.image}.jpg`"
              :alt="post.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              width="800"
              height="400"
              placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-t from-base-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </figure>

          <div class="card-body p-8">
            <!-- Date & Meta -->
            <div class="flex items-center gap-3 text-sm text-base-content/60 mb-3 font-medium">
              <span class="bg-base-200 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Article</span>
              <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</time>
            </div>

            <!-- Title -->
            <h2 class="card-title text-3xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
              {{ post.title }}
            </h2>

            <!-- Description -->
            <p class="text-base-content/70 leading-relaxed line-clamp-3 mb-6">
              {{ post.content }}
            </p>
          </div>
        </NuxtLink>
      </div>
  </div>
</template>
