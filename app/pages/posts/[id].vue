<script setup lang="ts">
import { posts } from '~/utils/postsData'

const route = useRoute()
const router = useRouter()

const post = computed(() => {
  return posts.find(p => p.id === route.params.id)
})

// Redirect if post not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true
  })
}

// Update title meta
useHead({
  title: post.value?.title ? `${post.value.title} | Blog` : 'Blog Post'
})
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div v-if="post" class="max-w-4xl mx-auto">
      
      <!-- Title & Meta -->
      <div v-motion-slide-left class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-base-content mb-6 leading-tight">
          {{ post.title }}
        </h1>

        <div class="flex items-center gap-3 text-sm text-base-content/60 font-medium">
          <span class="bg-base-200 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Article</span>
          <time :datetime="post.date">{{ new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</time>
        </div>
      </div>

      <!-- Hero Image -->
      <figure v-motion-slide-bottom class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl mb-12">
          <NuxtImg
            :src="`/images/${post.image}.jpg`"
            :alt="post.title"
            class="w-full h-full object-cover"
            width="1200"
            height="675"
            placeholder
          />
      </figure>

      <!-- Content -->
      <div v-motion-slide-bottom :delay="200">
        <!-- We use the htmlContent from the data -->
        <div v-html="post.htmlContent"></div>
      </div>
      
    </div>
  </div>
</template>

<style>
/* Custom prose styles if needed, though Tailwind typography plugin does most of the work */
.prose {
  max-width: none;
}
.prose img {
  border-radius: 0.75rem;
}
</style>
