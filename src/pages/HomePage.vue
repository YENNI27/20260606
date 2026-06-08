<template>
  <div class="relative overflow-hidden">
    <TaiwanDecorations />

    <div class="relative z-10 py-12">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-bold mb-4 animate-bounce">🚇 台灣旅行規劃小幫手</h1>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-600">不知道去哪玩？讓我們一起規劃專屬於你的台灣旅行！</h2>
      </div>

      <div v-if="badges.length" class="bg-white/80 p-6 rounded-3xl shadow-lg mb-10">
        <h3 class="text-2xl font-bold mb-4">🏆 你的旅行成就</h3>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="(badge, idx) in badges" :key="idx" class="bg-gradient-to-r from-yellow-300 to-orange-300 px-5 py-3 rounded-full font-bold text-white">
            {{ badge.icon }} {{ badge.name }}
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <router-link
          v-for="(feature, idx) in features"
          :key="idx"
          :to="feature.link"
          class="block h-full"
        >
          <Card className="h-full flex flex-col items-center text-center">
            <div className="text-5xl mb-4">{{ feature.icon }}</div>
            <h3 className="font-bold text-lg mb-2">{{ feature.title }}</h3>
            <p className="text-gray-600 text-sm">{{ feature.desc }}</p>
            <div className="mt-4 text-sm text-blue-600 font-bold">前往 →</div>
          </Card>
        </router-link>
      </div>

      <div class="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl shadow-lg p-8 text-white text-center">
        <h3 class="text-3xl font-bold mb-4">準備好了嗎？</h3>
        <p class="text-lg mb-6">和水豚一起探索台灣吧！🐹</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <router-link to="/guide" class="px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:scale-105 transition">立即開始</router-link>
          <router-link to="/map" class="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:scale-105 transition">看景點地圖</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAchievements } from '../composables/useAchievements'
import { TaiwanDecorations, Card } from '../components/Common.vue'

const { getBadges } = useAchievements()
const badges = getBadges()

const features = [
  { icon: '🎓', title: '旅行規劃教學', desc: '一步步學會如何規劃完美旅行', link: '/guide' },
  { icon: '❓', title: '旅行偏好測驗', desc: '找出最適合你的旅行風格', link: '/quiz' },
  { icon: '📍', title: '智慧行程產生器', desc: '自動為你生成完美行程', link: '/itinerary' },
  { icon: '💰', title: '預算規劃器', desc: '精準計算旅行預算分配', link: '/budget' },
  { icon: '🎲', title: '選擇障礙救星', desc: '讓系統隨機幫你選擇景點', link: '/random' },
  { icon: '🗺️', title: '台灣景點地圖', desc: '探索全台灣的必去景點', link: '/map' },
  { icon: '💡', title: '旅遊小知識', desc: '了解實用的旅遊知識和技巧', link: '/trivia' },
]
</script>
