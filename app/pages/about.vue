<script setup lang="ts">
const { t } = useI18n();

useHead({
    title: () => t("seo.about"),
});

const technologies = [
    { name: "Nuxt 4", icon: "uil:layer-group", key: "nuxt" },
    { name: "Vue 3", icon: "uil:window", key: "vue" },
    { name: "Bun", icon: "uil:bolt", key: "bun" },
    { name: "Tailwind CSS 4", icon: "uil:wind", key: "tailwind" },
    { name: "DaisyUI", icon: "uil:palette", key: "daisyui" },
    { name: "TypeScript", icon: "uil:brackets-curly", key: "typescript" },
    { name: "DeepSeek", icon: "uil:robot", key: "deepseek" },
    { name: "Vercel", icon: "uil:cloud-upload", key: "vercel" },
];
</script>

<template>
    <div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-motion-slide-left suppressHydrationWarning class="mb-12">
            <h1 class="text-4xl font-bold text-base-content mb-4">
                {{ $t("about.title") }}
            </h1>
            <p class="text-base-content/60 max-w-2xl">
                {{ $t("about.subtitle") }}
            </p>
        </div>

        <div
            v-motion-slide-bottom
            suppressHydrationWarning
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
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
                    <p class="text-base-content/70 text-sm mb-3">
                        {{ $t(`about.techs.${tech.key}.description`) }}
                    </p>
                    <div class="bg-primary/10 rounded-lg p-3">
                        <p class="text-sm">
                            <span class="font-semibold text-primary"
                                >{{ $t("about.whyGreat") }}</span
                            >
                            {{ $t(`about.techs.${tech.key}.why`) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
