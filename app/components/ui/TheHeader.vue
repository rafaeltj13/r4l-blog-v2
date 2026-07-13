<script setup lang="ts">
/**
 * TheHeader component
 * Handles scroll state and displays navigation, logo, and actions.
 */
const isScrolled = ref(false);
const navigationLinks = useNavigationLinks();
const { dialogRef, open, close } = useDialog();

function handleNavClick() {
    close();
}

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 10;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });
});
</script>

<template>
    <header
        v-motion-fade
        suppressHydrationWarning
        class="sticky top-0 z-50 w-full border-b transition-all duration-300"
        :class="[
            isScrolled
                ? 'bg-base-100/80 backdrop-blur supports-backdrop-filter:bg-base-100/60 border-base-200/40'
                : 'bg-transparent border-transparent',
        ]"
    >
        <div
            class="container mx-auto flex h-14 items-center justify-between max-w-7xl px-4 md:px-8"
        >
            <!-- Left: Mobile menu + Logo -->
            <div class="flex flex-1 items-center justify-start gap-2">
                <button
                    type="button"
                    class="btn btn-ghost btn-square md:hidden"
                    aria-label="Open navigation menu"
                    @click="open"
                >
                    <Icon name="uil:bars" :size="20" />
                </button>

                <NuxtLink to="/" class="group flex items-center space-x-2">
                    <NuxtImg src="/images/logo.png" alt="Logo" width="56" height="56" class="size-14 mt-2 transition-transform duration-300 group-hover:scale-110" />
                    <span
                        class="hidden font-bold sm:flex items-center transition-colors duration-300"
                    >
                        <span
                            class="text-base-content transition-colors duration-300 group-hover:text-primary"
                            >.blog.</span
                        >
                        <span
                            class="text-primary transition-colors duration-300 group-hover:text-base-content"
                            >v2</span
                        >
                    </span>
                </NuxtLink>
            </div>

            <!-- Center: Navigation -->
            <div class="hidden md:flex flex-1 justify-center">
                <nav class="flex items-center gap-4 text-sm font-medium">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="transition-colors hover:text-primary text-base-content/60"
                        active-class="text-primary"
                        >{{ link.label }}</NuxtLink
                    >
                </nav>
            </div>

            <!-- Right: Social Icons & Theme Toggle -->
            <div class="flex flex-1 items-center justify-end space-x-2">
                <UiAppSocialIcons />
                <UiThemeToggle />
            </div>
        </div>
    </header>

    <!-- Mobile navigation modal (bottom sheet) -->
    <dialog ref="dialogRef" class="modal modal-bottom">
            <div class="modal-box p-0 rounded-t-2xl">
                <div class="flex items-center justify-between p-4 border-b border-base-200">
                    <span class="font-bold text-lg">Navigation</span>
                    <button
                        type="button"
                        class="btn btn-ghost btn-square"
                        aria-label="Close navigation menu"
                        @click="close"
                    >
                        <Icon name="uil:times" :size="20" />
                    </button>
                </div>
                <nav class="flex flex-col p-4">
                    <NuxtLink
                        v-for="link in navigationLinks"
                        :key="link.to"
                        :to="link.to"
                        class="flex items-center gap-3 py-3 text-lg font-medium transition-colors hover:text-primary text-base-content/60"
                        active-class="text-primary"
                        @click="handleNavClick"
                    >
                        <Icon :name="link.icon" :size="20" />
                        {{ link.label }}
                    </NuxtLink>
                </nav>
            </div>
        <form method="dialog" class="modal-backdrop">
            <button @click="close">close</button>
        </form>
    </dialog>
</template>
