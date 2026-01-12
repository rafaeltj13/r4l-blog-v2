<script setup lang="ts">
useHead({
  title: 'R4L - Chat'
})

import { ref, nextTick } from 'vue'

definePageMeta({
  title: 'Chat'
})

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

interface ChatResponse {
  message: {
    role: string
    content: string
  }
}

const messages = ref<Message[]>([
  {
    id: 1,
    text: "Hey there! 👋 This is my AI-powered digital twin, trained to chat about my professional experience, projects, and interests. Feel free to ask about my work, tech stack, or anything you'd like to know about me!",
    sender: 'bot',
    timestamp: '3:27:18 PM' // Placeholder time
  }
])

const userInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  error.value = null

  // Add user message
  const userMsg: Message = {
    id: Date.now(),
    text: userInput.value,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }
  messages.value.push(userMsg)
  
  const input = userInput.value
  userInput.value = ''
  await scrollToBottom()
  
  // Call the AI chat API
  isLoading.value = true
  try {
    const response = await $fetch<ChatResponse>('/api/chat', {
      method: 'POST',
      body: { message: input }
    })

    const botMsg: Message = {
      id: Date.now() + 1,
      text: response.message.content,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
    messages.value.push(botMsg)
  } catch (err: unknown) {
    console.error('Chat error:', err)
    error.value = 'Sorry, I couldn\'t process your message. Please try again.'
    
    const errorMsg: Message = {
      id: Date.now() + 1,
      text: '⚠️ Sorry, I encountered an error processing your message. Please try again.',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }
    messages.value.push(errorMsg)
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <div class="py-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-64px)] flex flex-col">
    <div v-motion-slide-left suppressHydrationWarning class="mb-8">
      <h1 class="text-4xl font-bold text-base-content">Chat with Digital Me</h1>
    </div>

    <!-- Chat Messages Area -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto overflow-x-hidden mb-8 pr-2 space-y-4 scrollbar-thin scrollbar-thumb-base-content/20 scrollbar-track-base-100">
      <template v-for="msg in messages" :key="msg.id">
        <!-- Bot Message -->
        <div 
          v-if="msg.sender === 'bot'"
          v-motion-slide-visible-once-left
          class="chat chat-start"
        >
          <div class="chat-image avatar">
            <div class="w-10 rounded-full border border-base-content/10">
              <img 
                alt="Digital Me Avatar" 
                src="~/assets/images/profile-cutted.jpg" 
              />
            </div>
          </div>
          <div class="chat-header opacity-50 text-xs mb-1">
            Digital Me
            <time class="text-xs opacity-50 ml-1">{{ msg.timestamp }}</time>
          </div>
          <div class="chat-bubble chat-bubble-primary">
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
            You
            <time class="text-xs opacity-50 ml-1">{{ msg.timestamp }}</time>
          </div>
          <div class="chat-bubble chat-bubble-secondary">
            {{ msg.text }}
          </div>
        </div>
      </template>

      <!-- Typing Indicator -->
      <div 
        v-if="isLoading"
        class="flex items-center gap-3 pl-1"
      >
        <div class="w-10 h-10 rounded-full border border-base-content/10 overflow-hidden">
          <img 
            alt="Digital Me Avatar" 
            src="~/assets/images/profile-cutted.jpg"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
          <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
          <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
        </div>
        <span class="text-sm text-base-content/50">Digital Me is typing...</span>
      </div>
    </div>

    <!-- Input Area -->
    <div v-motion-slide-visible-once-bottom class="mt-auto">
      <form @submit.prevent="sendMessage" class="relative group rounded-xl p-[2px] overflow-hidden">
        <!-- Animated Gradient Background -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_200%] opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Input Container -->
        <div class="relative bg-base-100 rounded-[10px] p-2 flex gap-2 items-end">
          <textarea
            v-model="userInput"
            placeholder="I heard that you are a great developer, please tell me more about yourself..."
            class="textarea textarea-ghost w-full resize-none focus:bg-transparent focus:outline-none text-base h-20 leading-normal"
            @keydown.enter.exact.prevent="sendMessage"
          ></textarea>
          
          <button 
            type="submit" 
            class="btn btn-primary btn-sm mb-2 mr-2"
            :disabled="!userInput.trim()"
          >
            Submit
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
  scrollbar-color: color-mix(in srgb, currentColor 20%, transparent) transparent;
}
</style>
