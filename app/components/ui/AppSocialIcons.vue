<script setup lang="ts">
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/rafaeltj13',
    icon: 'uil:github'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rafael-de-ara%C3%BAjo-14b5b1117/',
    icon: 'uil:linkedin'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/rafaeldearaujo_',
    icon: 'uil:instagram'
  }
]
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <a 
      v-for="link in socialLinks" 
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-base-content transition-colors hover:text-primary flex items-center justify-center"
      :aria-label="link.name"
    >
      <Icon :name="link.icon" :size="20" />
    </a>
  </div>
</template>
