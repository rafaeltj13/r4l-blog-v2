<script setup lang="ts">
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
]

const currentTheme = ref('light')

onMounted(() => {
  // Initialize theme from HTML attribute or localStorage if available
  const html = document.querySelector('html')
  const savedTheme = localStorage.getItem('theme') || html?.getAttribute('data-theme') || 'light'
  currentTheme.value = savedTheme
  applyTheme(savedTheme)
})

const applyTheme = (theme: string) => {
  const html = document.querySelector('html')
  if (html) {
    html.setAttribute('data-theme', theme)
    // Also manage the .dark class for Tailwind dark mode if using 'class' strategy
    if (['dark', 'business', 'halloween', 'forest', 'black', 'luxury', 'dracula', 'night', 'coffee', 'dim', 'sunset'].includes(theme)) { 
        html.classList.add('dark') 
    } else {
        html.classList.remove('dark')
    }
  }
  localStorage.setItem('theme', theme)
  currentTheme.value = theme
}
</script>

<template>
  <ClientOnly>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-square">
        <Icon name="uil:palette" :size="20" />
      </div>
      <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm border border-base-200 max-h-96 overflow-y-auto flex-nowrap">
        <li v-for="theme in themes" :key="theme">
          <button 
              @click="applyTheme(theme)"
              :class="{ 'active': currentTheme === theme }"
          >
              {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
          </button>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>
