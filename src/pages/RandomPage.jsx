import { useState } from 'react';
import { Card } from '../components/Common';
import { taiwanAttractions } from '../data/attractions';

export const RandomPage = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);

  const getRandomRecommendation = () => {
    const random = taiwanAttractions[Math.floor(Math.random() * taiwanAttractions.length)];
    setRecommendation(random);
    setHistory(prev => [...prev, random].slice(-5));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">🎲 選擇障礙救星</h1>
        <p className="text-center text-gray-600 mb-8">讓系統隨機為你選擇景點</p>

        {!recommendation ? (
          <Card className="text-center py-16 mb-8">
            <div className="text-8xl mb-6">🎰</div>
            <h2 className="text-3xl font-bold mb-4">還在猶豫不決？</h2>
            <p className="text-xl text-gray-600 mb-8">讓我們幫你決定吧！</p>
            <button
              onClick={getRandomRecommendation}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg text-2xl hover:scale-110 transition"
            >
              🎲 幫我決定！
            </button>
          </Card>
        ) : (
          <Card className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6">📍 今天適合：</h2>
            
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-8 rounded-xl text-center mb-8">
              <div className="text-6xl mb-4">{recommendation.icon}</div>
              <div className="text-4xl font-bold mb-4">{recommendation.name}</div>
              <div className="text-lg text-gray-700 mb-4">{recommendation.description}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-bold">{recommendation.region}</div>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-bold">{recommendation.stayTime}</div>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">💰</div>
                <div className="font-bold">{recommendation.budgetLevel}</div>
              </div>
              <div className="bg-pink-100 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-bold">{recommendation.features.join('/')}</div>
              </div>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg text-center mb-8">
              <p className="text-lg font-semibold">✅ 符合你的預算與喜好</p>
            </div>

            <button
              onClick={getRandomRecommendation}
              className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 text-lg"
            >
              🎲 再選一次
            </button>
          </Card>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">📜 選擇歷史：</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 text-center shadow hover:shadow-lg cursor-pointer transition"
                  onClick={() => setRecommendation(item)}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-bold text-sm">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
