import { useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { Card } from '../components/Common';
import { taiwanAttractions } from '../data/attractions';

export const ItineraryPage = () => {
  const [region, setRegion] = useState('北部');
  const [duration, setDuration] = useState('一日遊');
  const [preferences, setPreferences] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const { unlockAchievement } = useAchievements();

  const regions = ['北部', '中部', '南部', '東部'];
  const durations = ['半天', '一日遊', '兩天一夜'];
  const prefOptions = ['美食', '風景', '文化', '攝影'];

  const generateItinerary = () => {
    const regionAttractions = taiwanAttractions.filter(a => a.region === region);
    const filteredAttractions = regionAttractions.filter(a =>
      preferences.length === 0 || preferences.some(p => a.features.includes(p))
    );

    const items = filteredAttractions.slice(0, 4);
    const schedule = items.map((item, idx) => ({
      time: `${9 + idx * 3}:00`,
      place: item.name,
      description: item.description,
      icon: item.icon,
    }));

    setItinerary(schedule);
    unlockAchievement('itineraryGenerated');
  };

  const togglePreference = (pref) => {
    setPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">📍 智慧行程產生器</h1>
        <p className="text-center text-gray-600 mb-8">輸入偏好，自動為你生成完美行程</p>

        {!itinerary ? (
          <Card className="mb-8">
            {/* Region Selection */}
            <div className="mb-8">
              <label className="block font-bold text-lg mb-4">旅行地區</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {regions.map(r => (
                  <button
                    key={r}
                    onClick={() => setRegion(r)}
                    className={`py-3 rounded-lg font-bold transition ${
                      region === r ? 'bg-yellow-400 text-white' : 'bg-white border-2 border-yellow-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="mb-8">
              <label className="block font-bold text-lg mb-4">天數</label>
              <div className="grid grid-cols-3 gap-3">
                {durations.map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-3 rounded-lg font-bold transition ${
                      duration === d ? 'bg-yellow-400 text-white' : 'bg-white border-2 border-yellow-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences Selection */}
            <div className="mb-8">
              <label className="block font-bold text-lg mb-4">偏好 (可複選)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {prefOptions.map(pref => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`py-3 rounded-lg font-bold transition ${
                      preferences.includes(pref)
                        ? 'bg-yellow-400 text-white'
                        : 'bg-white border-2 border-yellow-300'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateItinerary}
              className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-lg hover:shadow-lg text-lg"
            >
              ✨ 生成行程
            </button>
          </Card>
        ) : (
          <Card>
            <h2 className="text-3xl font-bold mb-6 text-center">
              {region} - {duration} 行程
            </h2>
            
            <div className="space-y-4 mb-8">
              {itinerary.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{item.time} - {item.place}</div>
                      <div className="text-gray-700 mt-2">{item.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setItinerary(null)}
              className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              🔄 重新生成
            </button>
          </Card>
        )}
      </div>
    </div>
  );
};
