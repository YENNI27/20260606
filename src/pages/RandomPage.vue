<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2">🎲 選擇障礙救星</h1>
      <p class="text-center text-gray-600 mb-8">讓系統隨機為你選擇景點</p>

      <div v-if="!recommendation">
        <Card className="text-center py-16 mb-8">
          <div class="text-8xl mb-6">🎰</div>
          <h2 class="text-3xl font-bold mb-4">還在猶豫不決？</h2>
          <p class="text-xl text-gray-600 mb-8">讓我們幫你決定吧！</p>
          <button @click="getRandomRecommendation" class="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg text-2xl hover:scale-110 transition">🎲 幫我決定！</button>
        </Card>
      </div>

      <div v-else>
        <Card className="mb-8">
          <h2 class="text-3xl font-bold text-center mb-6">📍 今天適合：</h2>

          <div class="bg-gradient-to-r from-yellow-200 to-orange-200 p-8 rounded-xl text-center mb-8">
            <div class="text-6xl mb-4">{{ recommendation.icon }}</div>
            <div class="text-4xl font-bold mb-4">{{ recommendation.name }}</div>
            <div class="text-lg text-gray-700 mb-4">{{ recommendation.description }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-blue-100 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">📍</div>
              <div class="font-bold">{{ recommendation.region }}</div>
            </div>
            <div class="bg-purple-100 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">⏰</div>
              <div class="font-bold">{{ recommendation.stayTime }}</div>
            </div>
            <div class="bg-green-100 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">💰</div>
              <div class="font-bold">{{ recommendation.budgetLevel }}</div>
            </div>
            <div class="bg-pink-100 p-4 rounded-lg text-center">
              <div class="text-2xl mb-2">🎯</div>
              <div class="font-bold">{{ recommendation.features.join('/') }}</div>
            </div>
          </div>

          <div class="bg-yellow-100 p-4 rounded-lg text-center mb-8">
            <p class="text-lg font-semibold">✅ 符合你的預算與喜好</p>
          </div>

          <button @click="getRandomRecommendation" class="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 text-lg">🎲 再選一次</button>
        </Card>
      </div>

      <div v-if="history.length > 0" class="mt-8">
        <h3 class="text-2xl font-bold mb-4">📜 選擇歷史：</h3>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
          <button
            v-for="(item, idx) in history"
            :key="idx"
            @click="recommendation = item"
            class="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg cursor-pointer transition"
          >
            <div class="text-3xl mb-2">{{ item.icon }}</div>
            <div class="font-bold text-sm">{{ item.name }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Card } from '../components/Common.vue'
import { taiwanAttractions } from '../data/attractions'

const recommendation = ref(null)
const history = ref([])

const getRandomRecommendation = () => {
  const random = taiwanAttractions[Math.floor(Math.random() * taiwanAttractions.length)]
  recommendation.value = random
  history.value = [...history.value, random].slice(-5)
}
</script>
