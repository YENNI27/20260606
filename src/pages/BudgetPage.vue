<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-2">💰 預算規劃器</h1>
      <p class="text-center text-gray-600 mb-8">聰明分配你的旅行預算</p>

      <Card>
        <div class="mb-8">
          <label class="block font-bold text-lg mb-3">總預算 (元)</label>
          <div class="flex items-center gap-4">
            <input
              type="number"
              v-model.number="totalBudget"
              class="flex-1 border-2 border-yellow-300 rounded-lg px-4 py-3 text-2xl font-bold"
            />
            <span class="text-3xl font-bold">元</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div v-for="item in budgetItems" :key="item.key" :class="[item.color, 'text-white p-6 rounded-xl']">
            <div class="text-3xl mb-2">{{ item.emoji }}</div>
            <label class="block font-bold mb-2">{{ item.label }}</label>
            <div class="flex items-center gap-2">
              <input
                type="number"
                :value="budget[item.key]"
                @input="updateBudget(item.key, $event.target.value)"
                class="w-20 border-2 border-white rounded px-2 py-1 text-black font-bold"
              />
              <span class="text-lg">元</span>
            </div>
            <div class="mt-2 text-sm opacity-90">{{ ((budget[item.key] / totalBudget) * 100).toFixed(1) }}%</div>
          </div>
        </div>

        <div class="bg-yellow-100 p-6 rounded-xl mb-8">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-gray-600 font-semibold">已分配</div>
              <div class="text-3xl font-bold">{{ total }}</div>
            </div>
            <div>
              <div class="text-gray-600 font-semibold">剩餘</div>
              <div :class="['text-3xl font-bold', remaining >= 0 ? 'text-green-600' : 'text-red-600']">{{ remaining }}</div>
            </div>
            <div>
              <div class="text-gray-600 font-semibold">總額</div>
              <div class="text-3xl font-bold">{{ totalBudget }}</div>
            </div>
          </div>
        </div>

        <div v-if="remaining > 0" class="bg-green-100 p-4 rounded-lg mb-6 text-center">
          <p class="text-lg font-bold text-green-700">✅ 預算充足！還有 {{ remaining }} 可運用</p>
        </div>
        <div v-else-if="remaining < 0" class="bg-red-100 p-4 rounded-lg mb-6 text-center">
          <p class="text-lg font-bold text-red-700">⚠️ 預算超支 {{ Math.abs(remaining) }}，請調整</p>
        </div>
        <div v-else class="bg-blue-100 p-4 rounded-lg mb-6 text-center">
          <p class="text-lg font-bold text-blue-700">💯 預算完美分配！</p>
        </div>

        <button @click="handleComplete" class="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 text-lg">✓ 完成預算規劃</button>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useAchievements } from '../composables/useAchievements'
import { Card } from '../components/Common.vue'

const { unlockAchievement } = useAchievements()

const totalBudget = ref(3000)
const budget = reactive({ transport: 400, food: 600, spots: 500, reserve: 500 })

watch(totalBudget, (val) => {
  const scale = val / (Object.values(budget).reduce((a, b) => a + b, 0) || 1)
  Object.keys(budget).forEach((key) => {
    budget[key] = Math.round(budget[key] * scale)
  })
})

const budgetItems = [
  { key: 'transport', emoji: '🚆', label: '交通', color: 'bg-blue-400' },
  { key: 'food', emoji: '🍜', label: '飲食', color: 'bg-red-400' },
  { key: 'spots', emoji: '🎫', label: '景點', color: 'bg-green-400' },
  { key: 'reserve', emoji: '🛍️', label: '預留', color: 'bg-purple-400' },
]

const updateBudget = (key, value) => {
  const newValue = Math.max(0, Math.min(totalBudget.value, parseInt(value) || 0))
  budget[key] = newValue
}

const total = computed(() => Object.values(budget).reduce((a, b) => a + b, 0))
const remaining = computed(() => totalBudget.value - total.value)

const handleComplete = () => {
  unlockAchievement('budgetPlanned')
  window.alert('✅ 預算規劃完成！祝你旅行愉快～')
}
</script>
