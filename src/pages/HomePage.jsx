import { Link } from 'react-router-dom';
import { useAchievements } from '../context/AchievementContext';
import { TaiwanDecorations, Card, PrimaryButton } from '../components/Common';
import { MapPin, BookOpen, Zap, DollarSign, Dice6, Globe, Lightbulb, Trophy } from 'lucide-react';

export const HomePage = () => {
  const { getBadges } = useAchievements();
  const badges = getBadges();

  const features = [
    { icon: '🎓', title: '旅行規劃教學', desc: '一步步學會如何規劃完美旅行', link: '/guide' },
    { icon: '❓', title: '旅行偏好測驗', desc: '找出最適合你的旅行風格', link: '/quiz' },
    { icon: '📍', title: '智慧行程產生器', desc: '自動為你生成完美行程', link: '/itinerary' },
    { icon: '💰', title: '預算規劃器', desc: '精準計算旅行預算分配', link: '/budget' },
    { icon: '🎲', title: '選擇障礙救星', desc: '讓系統隨機幫你選擇景點', link: '/random' },
    { icon: '🗺️', title: '台灣景點地圖', desc: '探索全台灣的必去景點', link: '/map' },
    { icon: '💡', title: '旅遊小知識', desc: '了解實用的旅遊知識和技巧', link: '/trivia' },
    { icon: '🏆', title: '成就系統', desc: '完成任務，解鎖旅行徽章', link: '#achievements' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <TaiwanDecorations />
      
      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-bounce">
            🚇 台灣旅行規劃小幫手
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">
            Travel Buddy
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            <span className="block bg-white p-6 rounded-2xl shadow-lg inline-block">
              不知道去哪玩？讓我們一起規劃<br/>
              專屬於你的台灣旅行！🌸
            </span>
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/guide">
              <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg">
                ✨ 開始規劃旅行
              </button>
            </Link>
            <Link to="/quiz">
              <button className="px-8 py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-lg">
                ❓ 做測驗找風格
              </button>
            </Link>
          </div>
        </div>

        {/* Achievements Section */}
        {badges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold mb-4">🏆 你的旅行成就</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {badges.map((badge, idx) => (
                <div key={idx} className="bg-gradient-to-r from-yellow-300 to-orange-300 px-6 py-3 rounded-full font-bold text-lg">
                  {badge.icon} {badge.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link}>
              <Card className="h-full flex flex-col items-center text-center hover:scale-110">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl shadow-lg p-8 text-white text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">準備好了嗎？</h3>
          <p className="text-lg mb-6">
            和水豚一起探索台灣吧！🐹
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/guide">
              <button className="px-6 py-3 bg-white text-green-600 font-bold rounded-xl hover:scale-105 transition">
                立即開始
              </button>
            </Link>
            <Link to="/map">
              <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:scale-105 transition">
                看景點地圖
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
