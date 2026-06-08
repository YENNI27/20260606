import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-pink-400">
          🌏 Travel Buddy
        </h1>

        <div className="flex gap-4 flex-wrap">

          <Link
            className="px-4 py-2 rounded-full bg-pink-200 hover:bg-pink-300 transition"
            to="/"
          >
            首頁
          </Link>

          <Link
            className="px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 transition"
            to="/guide"
          >
            旅遊教學
          </Link>

          <Link
            className="px-4 py-2 rounded-full bg-green-200 hover:bg-green-300 transition"
            to="/itinerary"
          >
            開始規劃
          </Link>

          <Link
            className="px-4 py-2 rounded-full bg-blue-200 hover:bg-blue-300 transition"
            to="/budget"
          >
            預算規劃
          </Link>

          <Link
            className="px-4 py-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
            to="/quiz"
          >
            旅行測驗
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navigation;