import { computed, ref, watch } from 'vue'

const themes = [
  {
    id: 'forest-green',
    label: '森林綠',
    icon: '🌿',
    class: 'theme-forest-green',
    button: 'bg-green-100 text-green-800 hover:bg-green-200',
    buttonActive: 'bg-forest-green text-white',
    bgStart: '#E8F4E6',
    bgMid: '#C6E2C5',
    bgEnd: '#DFF2D8',
    textColor: '#18421C',
  },
  {
    id: 'sakura-pink',
    label: '櫻花粉',
    icon: '🌸',
    class: 'theme-sakura-pink',
    button: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    buttonActive: 'bg-sakura-pink text-white',
    bgStart: '#FFF0F4',
    bgMid: '#FFDDE4',
    bgEnd: '#FFE5EC',
    textColor: '#7A4452',
  },
  {
    id: 'ocean-blue',
    label: '海洋藍',
    icon: '🌊',
    class: 'theme-ocean-blue',
    button: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
    buttonActive: 'bg-ocean-blue text-white',
    bgStart: '#E3F4FF',
    bgMid: '#BEE6FF',
    bgEnd: '#DFF6FF',
    textColor: '#0F4D72',
  },
  {
    id: 'night-purple',
    label: '夜空紫',
    icon: '🌙',
    class: 'theme-night-purple',
    button: 'bg-violet-100 text-violet-800 hover:bg-violet-200',
    buttonActive: 'bg-night-purple text-white',
    bgStart: '#F4ECFF',
    bgMid: '#E7DBFF',
    bgEnd: '#F0E8FF',
    textColor: '#3F275A',
  },
]

const themeKey = 'travel-buddy-theme'
const currentThemeId = ref(localStorage.getItem(themeKey) || 'forest-green')

export function useTheme() {
  const currentTheme = computed(() => 
    themes.find(theme => theme.id === currentThemeId.value) || themes[0]
  )

  const themeStyle = computed(() => ({
    background: `linear-gradient(135deg, ${currentTheme.value.bgStart} 0%, ${currentTheme.value.bgMid} 50%, ${currentTheme.value.bgEnd} 100%)`,
    color: currentTheme.value.textColor,
  }))

  const setTheme = (id) => {
    currentThemeId.value = id
    localStorage.setItem(themeKey, id)
    document.documentElement.className = currentTheme.value.class
  }

  watch(currentTheme, (theme) => {
    document.documentElement.className = theme.class
  }, { immediate: true })

  return {
    themes,
    currentTheme,
    themeStyle,
    setTheme,
  }
}
