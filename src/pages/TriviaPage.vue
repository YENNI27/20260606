<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2">💡 旅遊小知識</h1>
      <p class="text-center text-gray-600 mb-12">點擊卡片翻牌，了解實用的旅遊知識</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(tip, idx) in dailyTips"
          :key="idx"
          class="h-64 cursor-pointer"
          @click="toggleFlip(idx)"
          style="perspective: 1200px;"
        >
          <div class="relative w-full h-full transition-transform duration-700" :style="{transform: flipped.has(idx) ? 'rotateY(180deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d'}">
            <!-- 正面 - 問題 -->
            <div class="absolute w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg" style="backface-visibility: hidden;">
              <div class="text-4xl mb-4">❓</div>
              <div class="text-2xl font-bold text-white">{{ tip.question }}</div>
              <div class="text-sm text-white mt-4 opacity-75">點擊翻牌查看答案</div>
            </div>
            <!-- 背面 - 答案 -->
            <div class="absolute w-full h-full bg-gradient-to-br from-emerald-300 to-teal-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg" style="backface-visibility: hidden; transform: rotateY(180deg);">
              <div class="text-4xl mb-4">✅</div>
              <div class="text-white font-semibold text-lg leading-relaxed">{{ tip.answer }}</div>
            </div>
          </div>
        </div>
      </div>

      <Card className="mt-12">
        <h3 class="text-2xl font-bold mb-4">🎯 旅行小貼士：</h3>
        <ul class="space-y-3 text-lg">
          <li>✈️ 提前預訂機票和住宿可以省下不少錢</li>
          <li>🗺️ 下載離線地圖，避免迷路</li>
          <li>💳 帶著信用卡和現金，分散風險</li>
          <li>🎒 打包輕便的行李，更方便探索</li>
          <li>📸 記得帶手機充電線和行動電源</li>
          <li>🚶 穿著舒適的鞋子，為長途步行做準備</li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Card } from '../components/Common.vue'
import { dailyTips } from '../data/attractions'

const flipped = ref(new Set())

const toggleFlip = (idx) => {
  const next = new Set(flipped.value)
  if (next.has(idx)) next.delete(idx)
  else next.add(idx)
  flipped.value = next
}
</script>

<style scoped>
</style>
