import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import PlanningGuidePage from '../pages/PlanningGuidePage.vue'
import QuizPage from '../pages/QuizPage.vue'
import BudgetPage from '../pages/BudgetPage.vue'
import ItineraryPage from '../pages/ItineraryPage.vue'
import MapPage from '../pages/MapPage.vue'
import RandomPage from '../pages/RandomPage.vue'
import TriviaPage from '../pages/TriviaPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/guide', component: PlanningGuidePage },
  { path: '/quiz', component: QuizPage },
  { path: '/budget', component: BudgetPage },
  { path: '/itinerary', component: ItineraryPage },
  { path: '/map', component: MapPage },
  { path: '/random', component: RandomPage },
  { path: '/trivia', component: TriviaPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
