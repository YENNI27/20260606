import { reactive, watch } from 'vue'

const STORAGE_KEY = 'travel-buddy-achievements'

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
const state = reactive(
  saved
    ? JSON.parse(saved)
    : {
        quizCompleted: false,
        budgetPlanned: false,
        itineraryGenerated: false,
        exploredAll: false,
      },
)

watch(
  state,
  () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  },
  { deep: true },
)

export function useAchievements() {
  const unlockAchievement = (achievementKey) => {
    if (Object.prototype.hasOwnProperty.call(state, achievementKey)) {
      state[achievementKey] = true
    }
  }

  const getBadges = () => {
    const badges = []
    if (state.quizCompleted) badges.push({ icon: '🏅', name: '旅行新手' })
    if (state.budgetPlanned) badges.push({ icon: '💰', name: '預算達人' })
    if (state.itineraryGenerated) badges.push({ icon: '📍', name: '行程規劃師' })
    if (state.exploredAll) badges.push({ icon: '🗺️', name: '台灣探索家' })
    return badges
  }

  return {
    achievements: state,
    unlockAchievement,
    getBadges,
  }
}
