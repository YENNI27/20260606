import { useState } from 'react';
import { Card } from '../components/Common';
import { taiwanAttractions } from '../data/attractions';

export const MapPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('北部');
  const [selectedSpot, setSelectedSpot] = useState(null);

  const regions = [
    { id: '北部', emoji: '🔵', color: 'bg-blue-400' },
    { id: '中部', emoji: '🟡', color: 'bg-yellow-400' },
    { id: '南部', emoji: '🟣', color: 'bg-purple-400' },
    { id: '東部', emoji: '🔴', color: 'bg-red-400' },
  ];

  const regionAttractions = taiwanAttractions.filter(a => a.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">🗺️ 台灣景點地圖</h1>
        <p className="text-center text-gray-600 mb-8">探索全台灣的必去景點</p>

        {/* Region Selection */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {regions.map(region => (
            <button
              key={region.id}
              onClick={() => {
                setSelectedRegion(region.id);
                setSelectedSpot(null);
              }}
              className={`py-4 rounded-lg font-bold text-lg transition-all ${
                selectedRegion === region.id
                  ? `${region.color} text-white shadow-lg scale-105`
                  : 'bg-white border-2 border-gray-300 hover:border-gray-500'
              }`}
            >
              {region.emoji} {region.id}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attractions List */}
          <div className="lg:col-span-1">
            <Card className="max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">{selectedRegion}景點</h3>
              <div className="space-y-2">
                {regionAttractions.map(attraction => (
                  <button
                    key={attraction.id}
                    onClick={() => setSelectedSpot(attraction)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedSpot?.id === attraction.id
                        ? 'bg-blue-400 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-2xl">{attraction.icon}</div>
                    <div className="font-bold">{attraction.name}</div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Details */}
          {selectedSpot && (
            <div className="lg:col-span-2">
              <Card>
                <div className="text-6xl mb-4 text-center">{selectedSpot.icon}</div>
                <h2 className="text-3xl font-bold text-center mb-6">{selectedSpot.name}</h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">地區</div>
                    <div className="font-bold text-lg">{selectedSpot.region}</div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">特色</div>
                    <div className="font-bold text-lg">{selectedSpot.features.join('/')}</div>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">時間</div>
                    <div className="font-bold text-lg">{selectedSpot.timeOfDay.join('/')}</div>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">預算</div>
                    <div className="font-bold text-lg">{selectedSpot.budgetLevel}</div>
                  </div>
                </div>

                <div className="bg-red-100 p-4 rounded-lg mb-6">
                  <div className="text-sm text-gray-600 mb-2">停留時間</div>
                  <div className="font-bold text-xl">{selectedSpot.stayTime}</div>
                </div>

                <div className="bg-cyan-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">介紹</div>
                  <div className="font-semibold text-lg">{selectedSpot.description}</div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
