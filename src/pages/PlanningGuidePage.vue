<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-4">📚 旅行規劃教學</h1>
      <p class="text-center text-gray-600 mb-8">一步一步帶你成為旅行規劃大師</p>

      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <button
          v-for="(step, idx) in steps"
          :key="idx"
          @click="currentStep = idx"
          :class="['w-full py-3 rounded-lg font-bold transition', currentStep === idx ? 'bg-yellow-400 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-yellow-100']"
        >
          {{ step.icon }} {{ step.title.split('：')[0] }}
        </button>
      </div>

      <Card className="mb-8">
        <h2 class="text-3xl font-bold mb-6 text-center">{{ steps[currentStep].icon }} {{ steps[currentStep].title }}</h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">

  <button
    v-for="option in currentStepData.options"
    :key="option"
    @click="selectOption(option)"
    :class="[
      'p-4 rounded-xl font-bold transition',
      selections[currentStepData.key] === option
        ? 'bg-yellow-400 text-white'
        : 'bg-white hover:bg-yellow-100'
    ]"
  >
    {{ option }}
  </button>

</div>

        <div class="bg-yellow-50 rounded-xl p-4 mb-6">
         <div>縣市：{{ selections.county || '未選擇' }}</div>
         <div>目的：{{ selections.purpose || '未選擇' }}</div>
         <div>時間：{{ selections.time || '未選擇' }}</div>
         <div>預算：{{ selections.budget || '未選擇' }}</div>
         <div>風格：{{ selections.style || '未選擇' }}</div>
        </div>
          <div class="flex justify-between gap-4">
          <button
            @click="currentStep = Math.max(0, currentStep - 1)"
            :disabled="currentStep === 0"
            class="px-6 py-3 bg-gray-300 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400"
          >
            ← 上一步
          </button>

          <button
            v-if="currentStep === steps.length - 1"
            @click="completeGuide"
            class="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
          >
            完成教學 ✓
          </button>
          <button
            v-else
            @click="currentStep = Math.min(steps.length - 1, currentStep + 1)"
            class="px-6 py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500"
          >
            下一步 →
          </button>
        </div>
            </Card>

      <!-- 行程結果 -->
      <Card v-if="showPlan" className="mt-8">

        <h2 class="text-3xl font-bold mb-6">
          🎉 你的專屬旅行行程
        </h2>

        <div
          v-for="item in itinerary"
          :key="item.time"
          class="bg-white border rounded-xl p-4 mb-3"
        >
          <div class="font-bold text-lg">
            {{ item.time }}
          </div>

          <div class="font-semibold">
            {{ item.name }}
          </div>

          <div class="text-gray-600">
            {{ item.description }}
          </div>
        </div>

      </Card>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useAchievements } from '../composables/useAchievements'
import { Card } from '../components/Common.vue'
import { countyGuide } from '../data/countyGuide'

const currentStep = ref(0)
const { unlockAchievement } = useAchievements()

const steps = [
  {
    title: '第一步：選擇旅遊縣市',
    icon: '🗺️',
    key: 'county',
    options: Object.keys(countyGuide)
  },
  {
    title: '第二步：決定旅行目的',
    icon: '🎯',
    key: 'purpose',
    options: ['放鬆', '美食', '拍照', '冒險']
  },
  {
    title: '第三步：安排時間',
    icon: '⏰',
    key: 'time',
    options: ['白天行程', '夜晚行程', '全天行程']
  },
  {
    title: '第四步：規劃預算',
    icon: '💰',
    key: 'budget',
    options: ['500以下', '500-1500', '1500-3000', '3000以上']
  },
  {
    title: '第五步：旅行風格',
    icon: '✨',
    key: 'style',
    options: ['悠閒', '熱鬧', '文青', '冒險']
  }
]

const selections = reactive({
  county: '',
  purpose: '',
  time: '',
  budget: '',
  style: ''
})

const itinerary = ref([])
const showPlan = ref(false)

const currentStepData = computed(() => steps[currentStep.value])

const selectOption = (option) => {
  selections[currentStepData.value.key] = option
}


const completeGuide = () => {

  const countyData =
    countyGuide[selections.county]

  if (!countyData) {
    alert('請先完成所有選項')
    return
  }

  const attractions =
    [...countyData.attractions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)

  const foods =
    [...countyData.foods]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)

  itinerary.value = [
    {
      time: '09:00',
      name: attractions[0].name,
      description: attractions[0].description
    },
    {
      time: '11:00',
      name: attractions[1].name,
      description: attractions[1].description
    },
    {
      time: '12:30',
      name: `午餐｜${foods[0].name}`,
      description: foods[0].description
    },
    {
      time: '14:00',
      name: attractions[2].name,
      description: attractions[2].description
    },
    {
      time: '17:30',
      name: `晚餐｜${foods[1].name}`,
      description: foods[1].description
    },
    {
      time: '19:00',
      name: attractions[3].name,
      description: attractions[3].description
    }
  ]

  showPlan.value = true

  unlockAchievement('itineraryGenerated')
}
</script>
