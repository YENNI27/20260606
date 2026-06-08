<template>
  <nav class="sticky top-0 z-50 bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
        <div>
          <h1 class="text-2xl font-bold text-pink-400">🌏 台灣旅行規劃小幫手</h1>
          <p class="text-sm text-gray-500">不知道去哪玩？一起規劃你的台灣旅行！</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="theme in themes"
            :key="theme.id"
            @click="setTheme(theme.id)"
            :class="['px-3 py-1 rounded-full text-sm font-semibold transition', currentTheme.id === theme.id ? theme.buttonActive : theme.button]"
          >
            {{ theme.icon }} {{ theme.label }}
          </button>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 justify-center md:justify-start">
        <router-link class="px-3 py-1 rounded-full text-sm bg-pink-200 hover:bg-pink-300 transition" to="/">首頁</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-yellow-200 hover:bg-yellow-300 transition" to="/guide">旅遊教學</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-cyan-200 hover:bg-cyan-300 transition" to="/map">台灣景點地圖</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-green-200 hover:bg-green-300 transition" to="/itinerary">行程規劃</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-blue-200 hover:bg-blue-300 transition" to="/budget">預算規劃</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-purple-200 hover:bg-purple-300 transition" to="/quiz">旅行測驗</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-orange-200 hover:bg-orange-300 transition" to="/random">隨機挑選</router-link>
        <router-link class="px-3 py-1 rounded-full text-sm bg-slate-200 hover:bg-slate-300 transition" to="/trivia">旅遊小知識</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { themes, currentTheme, setTheme } = useTheme()
</script>
