<script setup lang="ts">
import { experienceData } from "~/utils/experienceData";
import { posts } from "~/utils/postsData";

useHead({
    title: "R4L - Rafael Maciel",
});

const relevantProjects = experienceData.slice(0, 3);
const relevantPosts = [...posts].reverse().slice(0, 3);

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
        const sections = ["about", "projects", "posts"];
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
                <div>
                    <NuxtImg
                        class="rounded-xl mb-4 w-full max-w-sm lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[360px] max-h-[36vh] 2xl:max-h-[42vh] object-cover"
                        alt="Avatar"
                        src="images/IMG_5076.jpg"
                        width="360"
                        height="480"
                        sizes="(max-width: 1023px) 90vw, (max-width: 1279px) 300px, (max-width: 1535px) 340px, 360px"
                        fetchpriority="high"
                    />
                    <h1 class="text-4xl font-bold mb-2">
                        Rafael de Araújo Maciel
                    </h1>
                    <h2 class="text-xl text-primary/80 mb-6">
                        Senior Software Engineer
                    </h2>
                    <p
                        class="text-base-content/70 leading-relaxed mb-8 max-w-md"
                    >
                        I'm a web developer with a passion for creating seamless
                        user experiences. I build accessible, pixel-perfect
                        digital experiences for the web.
                    </p>
                </div>

                <nav class="hidden lg:block space-y-4 mb-8 lg:mb-0">
                    <button
                        class="block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'about'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('about')"
                    >
                        About me
                    </button>
                    <button
                        class="block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'projects'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('projects')"
                    >
                        Relevant projects
                    </button>
                    <button
                        class="block text-lg font-medium transition-colors text-left w-full"
                        :class="
                            activeSection === 'posts'
                                ? 'text-primary'
                                : 'hover:text-primary'
                        "
                        @click="scrollToSection('posts')"
                    >
                        Relevant posts
                    </button>
                </nav>
            </aside>

            <!-- Right Column: Scrollable Content (scrolls with page) -->
            <main v-motion-slide-bottom suppressHydrationWarning class="w-full lg:w-[60%] pt-2 lg:py-12">
                <div id="about" class="prose prose-lg max-w-none mb-16">
                    <h3 class="text-2xl font-bold mb-6">About me</h3>
                    <p class="mb-6">
                        Welcome to my corner of the web! I'm a developer from
                        Campina Grande, a city in Paraíba, Brazil, where my
                        journey in web development began. At 27, I've already
                        experienced quite an evolution in web technologies.
                    </p>
                    <p class="mb-6">
                        My path started with classic frameworks like AngularJS
                        and ASP.NET during my university years, but it was
                        discovering mordern frameworks like React and Vue that
                        truly ignited my passion for web development. Today, I
                        focus on creating meaningful digital experiences that
                        combine clean code with thoughtful design.
                    </p>
                    <p class="mb-6">
                        I have 8+ years of experience specializing in full-stack
                        web development. Advanced proficiency in modern
                        TypeScript frameworks including React, Vue.js, Next.js,
                        and Node.js. Successfully collaborated with global teams
                        to build scalable solutions, demonstrating effective
                        cross-cultural communication.
                    </p>
                    <p>
                        In my spare time, I'm usually playing DotA 2, NBA 2k26,
                        working out, hanging out with my girlfriend and two
                        cats, or watching series.
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
