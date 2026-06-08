<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">🗺️ 台灣景點地圖</h1>
        <p class="text-gray-600">點選台灣輪廓上的縣市，再看該縣市的 10 個推薦景點與 10 個在地美食。</p>
      </div>

      <Card className="mb-8">
        <h2 class="text-2xl font-bold mb-4">台灣輪廓互動地圖</h2>
        <p class="text-gray-600 mb-6">用台灣外型切分縣市，選擇後才會跳出該縣市的推薦內容。</p>

        <div class="map-silhouette mx-auto">
          <div
            v-for="county in counties"
            :key="county.id"
            :style="{ top: county.top, left: county.left }"
            class="county-pin"
          >
            <button
              @click="selectCounty(county.id)"
              :class="['inline-flex rounded-full px-3 py-2 text-xs font-semibold transition shadow-sm whitespace-nowrap', 'county-btn', county.region,selectedCounty === county.id ? 'selected' : ' hover:bg-slate-100']"
            >
              {{ county.short }}
            </button>
          </div>
        </div>
      </Card>

      <div class="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <Card>
          <div v-if="selectedCounty">
            <div class="mb-6">
              <h2 class="text-2xl font-bold">{{ selectedCounty }} 的推薦清單</h2>
              <p class="text-gray-600 mt-2">以下包含 10 個精選景點與 10 個在地美食，地圖選擇完才會顯示。</p>
            </div>

            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">🌟 10 大推薦景點</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="spot in topAttractions"
                  :key="spot.id"
                  class="attraction-card"
                >
                  <div class="h-28 rounded-t-3xl bg-slate-100 flex items-center justify-center text-5xl">
                    {{ spot.icon }}
                  </div>
                  <div class="p-5">
                    <div class="font-bold text-lg mb-2">{{ spot.name }}</div>
                    <div class="text-sm text-gray-500 mb-3">{{ spot.features.join(' / ') }}</div>
                    <p class="text-sm text-gray-700">{{ spot.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4">🍜 10 大在地美食</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="food in foodRecommendations"
                  :key="food.id"
                  class="bg-white rounded-3xl p-5 shadow-sm border border-slate-200"
                >
                  <div class="flex items-center gap-3 mb-3">
                    <div class="text-3xl">{{ food.icon }}</div>
                    <div>
                      <div class="font-bold text-lg">{{ food.name }}</div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700">{{ food.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-16">
            <div class="text-3xl mb-4">👆 請先點選台灣地圖上的縣市</div>
            <p class="text-gray-600">選擇完縣市後，這裡會呈現該縣市的景點與美食推薦。</p>
          </div>
        </Card>

        <Card className="space-y-4">
          <div class="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl p-6">
            <h3 class="text-2xl font-bold mb-2">使用說明</h3>
            <p class="text-gray-700 leading-relaxed">這是台灣外型的互動地圖，點選縣市後會跳出該縣市的推薦內容。每個縣市都準備 10 個獨立的景點與 10 個在地美食介紹。</p>
          </div>
          <div class="bg-white rounded-3xl p-6 shadow-sm">
            <h3 class="text-xl font-bold mb-3">小提醒</h3>
            <ul class="list-disc pl-5 space-y-2 text-gray-700">
              <li>地圖上的按鈕代表縣市區域，點一下即可載入推薦內容。</li>
              <li>每個縣市的景點與美食都是不同的，不會重複貼同一種內容。</li>
              <li>若要更真實的地圖，可以再加上台灣輪廓圖或縣市邊界線。</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Card } from '../components/Common.vue'
import { countyGuide } from '../data/countyGuide'

const counties = [
  { id: '基隆市', short: '基隆市', region: 'north', top: '5%', left: '50%' },
  { id: '台北市', short: '台北市', region: 'north', top: '11%', left: '40%' },
  { id: '新北市', short: '新北市', region: 'north', top: '18%', left: '35%' },
  { id: '桃園市', short: '桃園市', region: 'north', top: '26%', left: '30%' },
  { id: '新竹市', short: '新竹市', region: 'north', top: '33%', left: '30%' },
  { id: '新竹縣', short: '新竹縣', region: 'north', top: '38%', left: '30%' },

  { id: '苗栗縣', short: '苗栗縣', region: 'central', top: '45%', left: '30%' },
  { id: '台中市', short: '台中市', region: 'central', top: '52%', left: '33%' },
  { id: '彰化縣', short: '彰化縣', region: 'central', top: '58%', left: '34%' },
  { id: '南投縣', short: '南投縣', region: 'central', top: '58%', left: '55%' },
  { id: '雲林縣', short: '雲林縣', region: 'central', top: '65%', left: '35%' },

  { id: '嘉義市', short: '嘉義市', region: 'south', top: '71%', left: '43%' },
  { id: '嘉義縣', short: '嘉義縣', region: 'south', top: '75%', left: '35%' },
  { id: '台南市', short: '台南市', region: 'south', top: '81%', left: '40%' },
  { id: '高雄市', short: '高雄市', region: 'south', top: '87%', left: '45%' },
  { id: '屏東縣', short: '屏東縣', region: 'south', top: '95%', left: '53%' },

  { id: '宜蘭縣', short: '宜蘭縣', region: 'east', top: '18%', left: '70%' },
  { id: '花蓮縣', short: '花蓮縣', region: 'east', top: '45%', left: '75%' },
  { id: '台東縣', short: '台東縣', region: 'east', top: '74%', left: '70%' }
]

const selectedCounty = ref(null)
const selectCounty = (county) => {
  selectedCounty.value = county
}

const countyData = computed(() => selectedCounty.value ? countyGuide[selectedCounty.value] : null)
const topAttractions = computed(() => countyData.value?.attractions || [])
const foodRecommendations = computed(() => countyData.value?.foods || [])
</script>

<style scoped>
.map-silhouette {
  position: relative;

  width: min(100%, 850px);
  height: 1350px;

  margin: 0 auto;

  background: linear-gradient(
    180deg,
    #dcfce7 0%,
    #bbf7d0 45%,
    #86efac 100%
  );

  clip-path: polygon(
    48% 0%,
    58% 2%,
    68% 6%,
    75% 12%,
    80% 20%,
    82% 30%,
    82% 42%,
    81% 54%,
    79% 66%,
    75% 78%,
    69% 88%,
    61% 95%,
    54% 100%,

    46% 98%,
    39% 92%,
    31% 84%,
    25% 73%,
    20% 60%,
    18% 48%,
    18% 35%,
    20% 24%,
    24% 14%,
    31% 6%,
    40% 2%
  );

  border-radius: 40px;

  box-shadow:
    inset 0 0 0 4px rgba(255,255,255,.7),
    0 20px 50px rgba(0,0,0,.08);

  overflow: visible;
}

.county-pin {
  position: absolute;
  transform: translate(-50%, -50%);
}

.county-pin button {
  min-width: 95px;
  padding: 0.55rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.78rem;
  line-height: 1.2;
  white-space: nowrap;
}

.county-pin button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
}

.attraction-card {
  background: white;
  border-radius: 28px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.attraction-card:hover {
  transform: translateY(-4px);
}
.county-btn {
  min-width: 120px;
  height: 56px; 
  padding: 14px 20px;

  display: flex;
  align-items: center;   /* 垂直置中 */
  justify-content: center;  /* 水平置中 */

  font-size: 1000000000000000000000px;
  font-weight: 700;

  border-radius: 999px;

  border: none;

  transition: all .25s ease;

  box-shadow: 0 8px 18px rgba(0,0,0,.12);

  white-space: nowrap;

  cursor: pointer;
}

.county-btn:hover {
  transform: translateY(-2px) scale(1.05);
}

/* 北部 */
.county-btn.north {
  background: #a4d1fd;
  color: rgb(0, 0, 0);
}

/* 中部 */
.county-btn.central {
  background: #f1ab79;
  color: rgb(0, 0, 0);
}

/* 南部 */
.county-btn.south {
  background: #f99696;
  color: rgb(0, 0, 0);
}

/* 東部 */
.county-btn.east {
  background: #c9b3fc;
  color: rgb(0, 0, 0);
}

.county-btn.selected {
  outline: 4px solid #fff700;
  transform: scale(1.08);
}
</style>
