<script setup lang="ts">
import type { Post } from '~/utils/postsData'

defineProps<{
  post: Post
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <NuxtLink 
    :to="`/posts/${post.id}`" 
    class="group/item grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 mb-8 hover:bg-base-content/5 p-4 rounded-2xl transition-all duration-300"
  >
    <!-- Left: Image -->
    <div class="h-48 md:h-32 rounded-xl overflow-hidden">
      <NuxtImg 
        :src="`/images/${post.image}.jpg`" 
        :alt="post.title"
        class="w-full h-full object-cover transform group-hover/item:scale-105 transition-transform duration-500"
        width="400"
        height="250"
      />
    </div>

    <!-- Right: Content -->
    <div class="flex flex-col justify-center">
      <h3 class="text-xl font-bold text-base-content mb-2 group-hover/item:text-primary transition-colors">
        {{ post.title }}
      </h3>
      
      <p class="text-base-content/70 text-sm line-clamp-2 mb-3 leading-relaxed">
        {{ post.content }}
      </p>

      <div class="text-xs text-base-content/50 font-medium">
        {{ formatDate(post.date) }}
      </div>
    </div>
  </NuxtLink>
</template>
