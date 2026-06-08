import { useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { PrimaryButton, Card } from '../components/Common';
import { Check } from 'lucide-react';

export const PlanningGuidePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { unlockAchievement } = useAchievements();

  const steps = [
    {
      title: '第一步：決定旅行目的',
      icon: '🎯',
      content: [
        { emoji: '😴', title: '放鬆', desc: '想要悠閒度假，遠離城市喧囂' },
        { emoji: '🍜', title: '美食', desc: '探尋在地小吃和特色餐廳' },
        { emoji: '📷', title: '拍照', desc: '捕捉美景和打卡熱點' },
        { emoji: '🎭', title: '冒險', desc: '挑戰刺激的水上或山區活動' },
      ],
    },
    {
      title: '第二步：安排時間',
      icon: '⏰',
      content: [
        { emoji: '☀️', title: '白天行程', desc: '登山、逛街、參觀景點' },
        { emoji: '🌙', title: '夜晚行程', desc: '看夜景、逛夜市、享受夜生活' },
        { emoji: '🌅', title: '全天行程', desc: '包括日出、正餐和日落體驗' },
      ],
    },
    {
      title: '第三步：規劃預算',
      icon: '💰',
      content: [
        { emoji: '🚆', title: '交通', desc: '高鐵/火車/租車費用' },
        { emoji: '🏨', title: '住宿', desc: '飯店/民宿/青旅費用' },
        { emoji: '🍽️', title: '飲食', desc: '三餐和下午茶費用' },
        { emoji: '🎫', title: '門票', desc: '景點和體驗費用' },
      ],
    },
    {
      title: '第四步：避免踩雷',
      icon: '⚠️',
      content: [
        { emoji: '🏃', title: '行程太趕', desc: '每個景點預留充足時間，品質勝於數量' },
        { emoji: '🗺️', title: '景點太遠', desc: '確認景點距離，避免走冤枉路' },
        { emoji: '💸', title: '超出預算', desc: '記錄支出，隨時檢查預算進度' },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">📚 旅行規劃教學</h1>
        <p className="text-center text-gray-600 mb-8">一步一步帶你成為旅行規劃大師</p>

        {/* Progress */}
        <div className="flex justify-between mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 text-center">
              <button
                onClick={() => setCurrentStep(idx)}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  currentStep === idx
                    ? 'bg-yellow-400 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-yellow-100'
                }`}
              >
                {step.icon} {step.title.split('：')[0]}
              </button>
            </div>
          ))}
        </div>

        {/* Content */}
        <Card className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">{currentStepData.icon} {currentStepData.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentStepData.content.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-xl">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400"
            >
              ← 上一步
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => {
                  unlockAchievement('quizCompleted');
                  alert('🎉 恭喜！你已經完成教學！');
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
              >
                完成教學 ✓
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="px-6 py-3 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500"
              >
                下一步 →
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
