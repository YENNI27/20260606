import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

import HomePage from "./pages/HomePage";
import PlanningGuidePage from "./pages/PlanningGuidePage";
import QuizPage from "./pages/QuizPage";
import BudgetPage from "./pages/BudgetPage";
import ItineraryPage from "./pages/ItineraryPage";
import MapPage from "./pages/MapPage";
import RandomPage from "./pages/RandomPage";
import TriviaPage from "./pages/TriviaPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50">
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/guide"
            element={<PlanningGuidePage />}
          />

          <Route
            path="/quiz"
            element={<QuizPage />}
          />

          <Route
            path="/budget"
            element={<BudgetPage />}
          />

          <Route
            path="/itinerary"
            element={<ItineraryPage />}
          />

          <Route
            path="/map"
            element={<MapPage />}
          />

          <Route
            path="/random"
            element={<RandomPage />}
          />

          <Route
            path="/trivia"
            element={<TriviaPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;