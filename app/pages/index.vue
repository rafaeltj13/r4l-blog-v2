<script setup lang="ts">
import PersonalProjectItem from "~/components/projects/PersonalProjectItem.vue";

const { t } = useI18n();

useHead({
    title: () => t("seo.home"),
});

const localizedExperiences = useLocalizedExperiences();
const localizedProjects = useLocalizedProjects();
const localizedPosts = useLocalizedPosts();

const relevantProjects = computed(() =>
    localizedExperiences.value.slice(0, 3),
);
const personalProjects = computed(() =>
    localizedProjects.value.slice(0, 3),
);
const relevantPosts = computed(() => [...localizedPosts.value].reverse().slice(0, 3));

const activeSection = ref("about");

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        activeSection.value = id;
    }
};

// Intersection Observer to update active section
let observer: IntersectionObserver | null = null;

onMounted(() => {
    nextTick(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeSection.value = entry.target.id;
                    }
                });
            },
            {
                rootMargin: "-10% 0px -70% 0px",
                threshold: 0,
            },
        );

        // Observe sections
        const sections = ["about", "projects", "personal-projects", "posts"];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer?.observe(element);
        });
    });
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<template>
    <div class="container mx-auto max-w-7xl px-4 md:px-8 py-12 lg:py-0">
        <div class="flex flex-col lg:flex-row gap-0 lg:gap-12 relative">
            <!-- Left Column: Sticky Profile (on desktop) -->
            <aside
                v-motion-slide-left
                suppressHydrationWarning
                class="w-full lg:w-[40%] flex flex-col justify-between h-auto lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:py-12"
            >
                <div class="lg:flex lg:flex-col lg:flex-1 lg:min-h-0">
                    <NuxtImg
                        class="rounded-xl mb-4 h-[300px] w-auto mx-auto sm:mx-0 sm:h-auto sm:w-full sm:max-w-[300px] lg:flex-1 lg:min-h-0 lg:max-h-[480px] lg:h-auto lg:w-auto lg:max-w-none lg:self-start aspect-[3/4] object-cover"
                        alt="Avatar"
                        src="images/IMG_5076.jpg"
                        width="3024"
                        height="4032"
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 384px, (max-width: 1279px) 300px, (max-width: 1535px) 340px, 360px"
                        fetchpriority="high"
                        format="webp"
                        quality="90"
                    />
                    <h1 class="text-4xl font-bold mb-2">
                        Rafael de Araújo Maciel
                    </h1>
                    <h2 class="text-xl text-primary/80 mb-6">
                        {{ $t("home.role") }}
                    </h2>
                    <p
                        class="text-base-content/70 leading-relaxed mb-8 max-w-md"
                    >
                        {{ $t("home.intro") }}
                    </p>
                </div>

                <nav class="hidden lg:block space-y-4 mb-8 lg:mb-0">
                    <button
                        style="font-family: 'Bungee', sans-serif;"
                        class="cursor-pointer block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'about'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('about')"
                    >
                        {{ $t("home.aboutMe") }}
                    </button>
                    <button
                        style="font-family: 'Bungee', sans-serif;"
                        class="cursor-pointer block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'projects'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('projects')"
                    >
                        {{ $t("home.relevantProjects") }}
                    </button>
                    <button
                        style="font-family: 'Bungee', sans-serif;"
                        class="cursor-pointer block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'personal-projects'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('personal-projects')"
                    >
                        {{ $t("home.personalProjects") }}
                    </button>
                    <button
                        style="font-family: 'Bungee', sans-serif;"
                        class="cursor-pointer block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'posts'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('posts')"
                    >
                        {{ $t("home.relevantPosts") }}
                    </button>
                </nav>
            </aside>

            <!-- Right Column: Scrollable Content (scrolls with page) -->
            <main v-motion-slide-bottom suppressHydrationWarning class="w-full lg:w-[60%] pt-2 lg:py-12">
                <div id="about" class="scroll-mt-20 prose prose-lg max-w-none mb-16">
                    <h3 class="text-2xl font-bold mb-6">{{ $t("home.aboutMe") }}</h3>
                    <p class="mb-6">
                        {{ $t("home.p1") }}
                    </p>
                    <p class="mb-6">
                        {{ $t("home.p2") }}
                    </p>
                    <p class="mb-6">
                        {{ $t("home.p3") }}
                    </p>
                    <p>
                        {{ $t("home.p4") }}
                    </p>
                </div>

                <div id="projects" class="scroll-mt-20 mb-16">
                    <h3 class="text-2xl font-bold mb-6">{{ $t("home.relevantProjects") }}</h3>
                    <div class="space-y-8">
                        <ExperienceItem
                            v-for="(item, index) in relevantProjects"
                            :key="index"
                            :experience="item"
                        />
                    </div>
                </div>

                <div id="personal-projects" class="scroll-mt-20 mb-16">
                    <h3 class="text-2xl font-bold mb-2">{{ $t("home.personalProjects") }}</h3>
                    <p class="text-base-content/60 mb-6">
                        {{ $t("home.personalProjectsSubtitle") }}
                    </p>
                    <div class="space-y-8">
                        <PersonalProjectItem
                            v-for="project in personalProjects"
                            :key="project.id"
                            :project="project"
                        />
                    </div>
                </div>

                <div id="posts" class="scroll-mt-20 mb-16">
                    <h3 class="text-2xl font-bold mb-6">{{ $t("home.relevantPosts") }}</h3>
                    <div class="divide-y divide-base-content/10 border-y border-base-content/10">
                        <PostsPostItem
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
