import { useState } from 'react';
import { Card } from '../components/Common';
import { dailyTips } from '../data/attractions';

export const TriviaPage = () => {
  const [flipped, setFlipped] = useState(new Set());

  const toggleFlip = (idx) => {
    const newFlipped = new Set(flipped);
    if (newFlipped.has(idx)) {
      newFlipped.delete(idx);
    } else {
      newFlipped.add(idx);
    }
    setFlipped(newFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">💡 旅遊小知識</h1>
        <p className="text-center text-gray-600 mb-12">點擊卡片翻牌，了解實用的旅遊知識</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dailyTips.map((tip, idx) => (
            <div
              key={idx}
              className="h-64 cursor-pointer"
              onClick={() => toggleFlip(idx)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped.has(idx) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-4xl mb-4">❓</div>
                  <div className="text-2xl font-bold text-white">
                    {tip.question}
                  </div>
                  <div className="text-sm text-white mt-4">點擊翻牌</div>
                </div>

                {/* Back */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-green-300 to-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-4xl mb-4">✅</div>
                  <div className="text-white font-semibold text-lg leading-relaxed">
                    {tip.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <Card className="mt-12">
          <h3 className="text-2xl font-bold mb-4">🎯 旅行小貼士：</h3>
          <ul className="space-y-3 text-lg">
            <li>✈️ 提前預訂機票和住宿可以省下不少錢</li>
            <li>🗺️ 下載離線地圖，避免迷路</li>
            <li>💳 帶著信用卡和現金，分散風險</li>
            <li>🎒 打包輕便的行李，更方便探索</li>
            <li>📸 記得帶手機充電線和行動電源</li>
            <li>🚶 穿著舒適的鞋子，為長途步行做準備</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
