<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2">📍 智慧行程產生器</h1>
      <p class="text-center text-gray-600 mb-8">輸入偏好，自動為你生成完美行程</p>

      <div v-if="!itinerary">
        <Card className="mb-8">
          <div class="mb-8">
            <label class="block font-bold text-lg mb-4">旅行地區</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="regionOption in regions"
                :key="regionOption"
                @click="region = regionOption"
                :class="['py-3 rounded-lg font-bold transition', region === regionOption ? 'bg-yellow-400 text-white' : 'bg-white border-2 border-yellow-300']"
              >{{ regionOption }}</button>
            </div>
          </div>

          <div class="mb-8">
            <label class="block font-bold text-lg mb-4">天數</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="durationOption in durations"
                :key="durationOption"
                @click="duration = durationOption"
                :class="['py-3 rounded-lg font-bold transition', duration === durationOption ? 'bg-yellow-400 text-white' : 'bg-white border-2 border-yellow-300']"
              >{{ durationOption }}</button>
            </div>
          </div>

          <div class="mb-8">
            <label class="block font-bold text-lg mb-4">偏好 (可複選)</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                v-for="pref in prefOptions"
                :key="pref"
                @click="togglePreference(pref)"
                :class="['py-3 rounded-lg font-bold transition', preferences.includes(pref) ? 'bg-yellow-400 text-white' : 'bg-white border-2 border-yellow-300']"
              >{{ pref }}</button>
            </div>
          </div>

          <button @click="generateItinerary" class="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-lg hover:shadow-lg text-lg">✨ 生成行程</button>
        </Card>
      </div>

      <div v-else>
        <Card>
          <h2 class="text-3xl font-bold mb-6 text-center">{{ region }} - {{ duration }} 行程</h2>
          <div class="space-y-4 mb-8">
            <div v-for="(item, idx) in itinerary" :key="idx" class="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl">
              <div class="flex items-start gap-4">
                <div class="text-4xl">{{ item.icon }}</div>
                <div class="flex-1">
                  <div class="font-bold text-lg">{{ item.time }} - {{ item.place }}</div>
                  <div class="text-gray-700 mt-2">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <button @click="itinerary = null" class="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">🔄 重新生成</button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAchievements } from '../composables/useAchievements'
import { Card } from '../components/Common.vue'
import { taiwanAttractions } from '../data/attractions'

const region = ref('北部')
const duration = ref('一日遊')
const preferences = ref([])
const itinerary = ref(null)
const { unlockAchievement } = useAchievements()

const regions = ['北部', '中部', '南部', '東部']
const durations = ['半天', '一日遊', '兩天一夜']
const prefOptions = ['美食', '風景', '文化', '攝影']

const togglePreference = (pref) => {
  if (preferences.value.includes(pref)) {
    preferences.value = preferences.value.filter((item) => item !== pref)
  } else {
    preferences.value = [...preferences.value, pref]
  }
}

const generateItinerary = () => {
  const regionAttractions = taiwanAttractions.filter((a) => a.region === region.value)
  const filteredAttractions = regionAttractions.filter((a) =>
    preferences.value.length === 0 || preferences.value.some((p) => a.features.includes(p)),
  )

  const items = filteredAttractions.length ? filteredAttractions.slice(0, 4) : regionAttractions.slice(0, 4)
  itinerary.value = items.map((item, idx) => ({
    time: `${9 + idx * 3}:00`,
    place: item.name,
    description: item.description,
    icon: item.icon,
  }))

  unlockAchievement('itineraryGenerated')
}
</script>
