<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12">
    <div class="max-w-2xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">❓ 旅行偏好測驗</h1>
        <p class="text-gray-600">找出最適合你的旅行風格</p>
      </div>

      <div class="w-full bg-gray-300 rounded-full h-3 mb-8">
        <div class="bg-yellow-400 h-3 rounded-full transition-all" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }" />
      </div>

      <Card>
        <h2 class="text-3xl font-bold mb-8 text-center">問題 {{ currentQuestion + 1 }}/{{ questions.length }}</h2>
        <p class="text-2xl font-bold text-center mb-8">{{ questions[currentQuestion].question }}</p>

        <div class="space-y-4 mb-8">
          <button
            v-for="(option, idx) in questions[currentQuestion].options"
            :key="idx"
            @click="selectAnswer(option)
            "
            :class="['w-full p-6 rounded-xl font-bold text-lg transition-all', answers[currentQuestion] === option ? 'bg-yellow-400 text-white shadow-lg scale-105' : 'bg-white border-2 border-yellow-300 hover:bg-yellow-50']"
          >
            {{ option }}
          </button>
        </div>

        <div class="flex justify-between">
          <button
            @click="currentQuestion = Math.max(0, currentQuestion - 1)"
            :disabled="currentQuestion === 0"
            class="px-6 py-3 bg-gray-300 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← 上一題
          </button>
          <button
            @click="handleNext"
            :disabled="!answers[currentQuestion]"
            class="px-6 py-3 bg-yellow-400 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500"
          >
            {{ currentQuestion === questions.length - 1 ? '看結果 →' : '下一題 →' }}
          </button>
        </div>
      </Card>

      <div v-if="showResult" class="mt-8">
        <Card className="text-center">
          <div class="text-7xl mb-4">{{ result.icon }}</div>
          <h1 class="text-4xl font-bold mb-4">🎉 你是：</h1>
          <h2 class="text-3xl font-bold mb-6 text-yellow-600">《{{ result.title }}》</h2>

          <div class="bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-xl mb-8 text-lg font-semibold">{{ result.advice }}</div>

          <h3 class="text-2xl font-bold mb-6">🎯 推薦景點：</h3>
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div v-for="(name, idx) in result.recommendations" :key="idx" class="bg-pink-100 p-4 rounded-lg">
              <div class="text-3xl mb-2">{{ attractionIcon(name) }}</div>
              <div class="font-bold">{{ name }}</div>
            </div>
          </div>

          <button @click="resetQuiz" class="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">🔄 重新測驗</button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAchievements } from '../composables/useAchievements'
import { Card } from '../components/Common.vue'
import { quizAnswers, quizRecommendations, taiwanAttractions } from '../data/attractions'

const currentQuestion = ref(0)
const answers = ref({})
const showResult = ref(false)
const { unlockAchievement } = useAchievements()

const questions = [
  { id: 1, question: '你喜歡？', options: quizAnswers[1] },
  { id: 2, question: '你喜歡？', options: quizAnswers[2] },
  { id: 3, question: '你的預算？', options: quizAnswers[3] },
  { id: 4, question: '喜歡？', options: quizAnswers[4] },
]

const selectAnswer = (option) => {
  answers.value[currentQuestion.value] = option
}

const resultKey = computed(() => {
  const nature = answers.value[1]?.includes('日') || answers.value[1]?.includes('自然')
  const food = answers.value[0]?.includes('美食')
  const adventure = answers.value[3]?.includes('冒險') || answers.value[1]?.includes('冒險')
  const busy = answers.value[3]?.includes('熱鬧')

  if (nature) return 'nature-relaxed'
  if (food && busy) return 'foodie-busy'
  if (adventure) return 'photo-adventure'
  return 'cultural-relaxed'
})

const result = computed(() => quizRecommendations[resultKey.value])

const attractionIcon = (name) => taiwanAttractions.find(a => a.name === name)?.icon || '🌟'

const handleNext = () => {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value += 1
  } else {
    showResult.value = true
    unlockAchievement('quizCompleted')
  }
}

const resetQuiz = () => {
  currentQuestion.value = 0
  answers.value = {}
  showResult.value = false
}
</script>
