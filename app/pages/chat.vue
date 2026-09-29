<script setup lang="ts">
const { t, locale } = useI18n();

useHead({
    title: () => t("seo.chat"),
});

definePageMeta({
    title: "Chat",
});

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: string;
}

interface ChatResponse {
    message: {
        role: string;
        content: string;
    };
}

const dateLocale = computed(() => (locale.value === "pt-BR" ? "pt-BR" : "en-US"));

const nowStamp = () =>
    new Date().toLocaleTimeString(dateLocale.value, {
        hour: "numeric",
        minute: "2-digit",
    });

const messages = ref<Message[]>([
    {
        id: 1,
        text: t("chat.greeting"),
        sender: "bot",
        timestamp: nowStamp(),
    },
]);

// Keep the initial greeting in sync when the visitor switches language.
watch(locale, () => {
    const greeting = messages.value.find((msg) => msg.id === 1);
    if (greeting) greeting.text = t("chat.greeting");
});

const userInput = ref("");
const messagesContainer = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const scrollToBottom = async () => {
    await nextTick();
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight;
    }
};

const sendMessage = async () => {
    if (!userInput.value.trim() || isLoading.value) return;

    error.value = null;

    // Add user message
    const userMsg: Message = {
        id: Date.now(),
        text: userInput.value,
        sender: "user",
        timestamp: nowStamp(),
    };
    messages.value.push(userMsg);

    const input = userInput.value;
    userInput.value = "";
    await scrollToBottom();

    // Call the AI chat API
    isLoading.value = true;
    try {
        const response = await $fetch<ChatResponse>("/api/chat", {
            method: "POST",
            body: { message: input },
        });

        const botMsg: Message = {
            id: Date.now() + 1,
            text: response.message.content,
            sender: "bot",
            timestamp: nowStamp(),
        };
        messages.value.push(botMsg);
    } catch (err: unknown) {
        console.error("Chat error:", err);
        error.value = t("chat.error");

        const errorMsg: Message = {
            id: Date.now() + 1,
            text: t("chat.errorToast"),
            sender: "bot",
            timestamp: nowStamp(),
        };
        messages.value.push(errorMsg);
    } finally {
        isLoading.value = false;
        await scrollToBottom();
    }
};
</script>

<template>
    <div
        class="pt-12 pb-4 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100dvh-3.5rem-1px)] max-h-[calc(100dvh-3.5rem-1px)] flex flex-col overflow-x-clip"
    >
        <div v-motion-slide-left suppressHydrationWarning class="shrink-0 mb-8 sm:mb-12">
            <h1 class="text-4xl font-bold text-base-content mb-4">
                {{ $t("chat.title") }}
            </h1>
            <p class="text-base-content/60 max-w-2xl">
                {{ $t("chat.subtitle") }}
            </p>
        </div>

        <!-- Chat Messages Area -->
        <div
            ref="messagesContainer"
            class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mb-3 sm:mb-4 md:mb-6 pr-1 sm:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-base-content/20 scrollbar-track-base-100"
        >
            <template v-for="msg in messages" :key="msg.id">
                <!-- Bot Message -->
                <div
                    v-if="msg.sender === 'bot'"
                    v-motion-slide-visible-once-left
                    class="chat chat-start"
                >
                    <div class="chat-image avatar">
                        <div
                            class="w-8 sm:w-10 rounded-full border border-base-content/10"
                        >
                            <NuxtImg
                                alt="Digital Me Avatar"
                                src="images/profile-cutted.jpg"
                            />
                        </div>
                    </div>
                    <div class="chat-header opacity-50 text-xs mb-1">
                        {{ $t("chat.digitalMe") }}
                        <time class="text-xs opacity-50 ml-1">{{
                            msg.timestamp
                        }}</time>
                    </div>
                    <div class="chat-bubble chat-bubble-primary max-w-[90%] sm:max-w-[80%] break-words">
                        {{ msg.text }}
                    </div>
                </div>

                <!-- User Message -->
                <div
                    v-else
                    v-motion-slide-visible-once-right
                    class="chat chat-end"
                >
                    <div class="chat-header opacity-50 text-xs mb-1">
                        {{ $t("chat.you") }}
                        <time class="text-xs opacity-50 ml-1">{{
                            msg.timestamp
                        }}</time>
                    </div>
                    <div class="chat-bubble chat-bubble-secondary max-w-[90%] sm:max-w-[80%] break-words">
                        {{ msg.text }}
                    </div>
                </div>
            </template>

            <!-- Typing Indicator -->
            <div v-if="isLoading" class="flex items-center gap-3 pl-1">
                <div
                    class="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-base-content/10 overflow-hidden"
                >
                    <NuxtImg
                        alt="Digital Me Avatar"
                        src="images/profile-cutted.jpg"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="flex items-center gap-1">
                    <span
                        class="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style="animation-delay: 0ms"
                    ></span>
                    <span
                        class="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style="animation-delay: 150ms"
                    ></span>
                    <span
                        class="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style="animation-delay: 300ms"
                    ></span>
                </div>
                <span class="text-sm text-base-content/50"
                    >{{ $t("chat.typing") }}</span
                >
            </div>
        </div>

        <!-- Input Area -->
        <div v-motion-slide-visible-once-bottom class="shrink-0 mt-auto">
            <form
                class="relative group rounded-xl p-0.5 overflow-hidden"
                @submit.prevent="sendMessage"
            >
                <!-- Animated Gradient Background -->
                <div
                    class="absolute inset-0 bg-linear-to-r from-primary via-secondary to-accent animate-gradient bg-size-[200%_200%] opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                ></div>

                <!-- Input Container -->
                <div
                    class="relative bg-base-100 rounded-[10px] p-2 flex gap-2 items-end"
                >
                    <textarea
                        v-model="userInput"
                        :placeholder="$t('chat.placeholder')"
                        class="textarea textarea-ghost w-full resize-none focus:bg-transparent focus:outline-none text-sm sm:text-base h-16 sm:h-20 leading-normal"
                        @keydown.enter.exact.prevent="sendMessage"
                    ></textarea>

                    <button
                        type="submit"
                        class="btn btn-primary btn-sm mb-1.5 sm:mb-2 mr-1 sm:mr-2"
                        :disabled="!userInput.trim()"
                    >
                        {{ $t("chat.submit") }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient {
    animation: gradient 15s ease infinite;
}

/* Custom Scrollbar for Webkit */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: color-mix(in srgb, currentColor 20%, transparent);
    border-radius: 20px;
}

/* Custom Scrollbar for Firefox */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, currentColor 20%, transparent)
        transparent;
}
</style>
