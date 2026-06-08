import { useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { Card } from '../components/Common';

export const BudgetPage = () => {
  const [totalBudget, setTotalBudget] = useState(3000);
  const [budget, setBudget] = useState({
    transport: 400,
    food: 600,
    spots: 500,
    reserve: 500,
  });
  const { unlockAchievement } = useAchievements();

  const budgetItems = [
    { key: 'transport', emoji: '🚆', label: '交通', color: 'bg-blue-400' },
    { key: 'food', emoji: '🍜', label: '飲食', color: 'bg-red-400' },
    { key: 'spots', emoji: '🎫', label: '景點', color: 'bg-green-400' },
    { key: 'reserve', emoji: '🛍️', label: '預留', color: 'bg-purple-400' },
  ];

  const updateBudget = (key, value) => {
    const newValue = Math.max(0, Math.min(totalBudget, parseInt(value) || 0));
    setBudget(prev => ({ ...prev, [key]: newValue }));
  };

  const total = Object.values(budget).reduce((a, b) => a + b, 0);
  const remaining = totalBudget - total;

  const handleComplete = () => {
    unlockAchievement('budgetPlanned');
    alert('✅ 預算規劃完成！祝你旅行愉快～');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">💰 預算規劃器</h1>
        <p className="text-center text-gray-600 mb-8">聰明分配你的旅行預算</p>

        <Card className="mb-8">
          <div className="mb-8">
            <label className="block font-bold text-lg mb-3">總預算 (元)</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => {
                  const val = Math.max(0, parseInt(e.target.value) || 0);
                  setTotalBudget(val);
                  const scale = val / (Object.values(budget).reduce((a,b) => a+b, 0) || 1);
                  setBudget(prev => {
                    const newBudget = {};
                    for (const [k, v] of Object.entries(prev)) {
                      newBudget[k] = Math.round(v * scale);
                    }
                    return newBudget;
                  });
                }}
                className="flex-1 border-2 border-yellow-300 rounded-lg px-4 py-3 text-2xl font-bold"
              />
              <span className="text-3xl font-bold">元</span>
            </div>
          </div>

          {/* Budget Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {budgetItems.map(item => (
              <div key={item.key} className={`${item.color} text-white p-6 rounded-xl`}>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <label className="block font-bold mb-2">{item.label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={budget[item.key]}
                    onChange={(e) => updateBudget(item.key, e.target.value)}
                    className="w-20 border-2 border-white rounded px-2 py-1 text-black font-bold"
                  />
                  <span className="text-lg">元</span>
                </div>
                <div className="mt-2 text-sm opacity-90">
                  {((budget[item.key] / totalBudget) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-yellow-100 p-6 rounded-xl mb-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-gray-600 font-semibold">已分配</div>
                <div className="text-3xl font-bold">${total}</div>
              </div>
              <div>
                <div className="text-gray-600 font-semibold">剩餘</div>
                <div className={`text-3xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remaining}
                </div>
              </div>
              <div>
                <div className="text-gray-600 font-semibold">總額</div>
                <div className="text-3xl font-bold">${totalBudget}</div>
              </div>
            </div>
          </div>

          {/* Status */}
          {remaining > 0 ? (
            <div className="bg-green-100 p-4 rounded-lg mb-6 text-center">
              <p className="text-lg font-bold text-green-700">✅ 預算充足！還有 ${remaining} 可運用</p>
            </div>
          ) : remaining < 0 ? (
            <div className="bg-red-100 p-4 rounded-lg mb-6 text-center">
              <p className="text-lg font-bold text-red-700">⚠️ 預算超支 ${Math.abs(remaining)}，請調整</p>
            </div>
          ) : (
            <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
              <p className="text-lg font-bold text-blue-700">💯 預算完美分配！</p>
            </div>
          )}

          <button
            onClick={handleComplete}
            className="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 text-lg"
          >
            ✓ 完成預算規劃
          </button>
        </Card>
      </div>
    </div>
  );
};
