<template>
  <div class="min-h-screen transition-colors" :class="currentTheme.class" :style="themeStyle">
    <Navigation />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useTheme } from './composables/useTheme'
import Navigation from './components/Navigation.vue'

const { currentTheme, themeStyle } = useTheme()
</script>
