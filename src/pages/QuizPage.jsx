import { useState } from 'react';
import { useAchievements } from '../context/AchievementContext';
import { Card, PrimaryButton } from '../components/Common';
import { quizAnswers, quizRecommendations, taiwanAttractions } from '../data/attractions';

export const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const { unlockAchievement } = useAchievements();

  const questions = [
    { id: 1, question: '你喜歡？', options: quizAnswers[1] },
    { id: 2, question: '你喜歡？', options: quizAnswers[2] },
    { id: 3, question: '你的預算？', options: quizAnswers[3] },
    { id: 4, question: '喜歡？', options: quizAnswers[4] },
  ];

  const selectAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showRecommendation();
    }
  };

  const showRecommendation = () => {
    const nature = answers[1]?.includes('日') || answers[1]?.includes('自然');
    const food = answers[0]?.includes('美食');
    const adventure = answers[3]?.includes('冒險') || answers[1]?.includes('冒險');
    const busy = answers[3]?.includes('熱鬧');

    let resultKey = 'cultural-relaxed';
    if (nature) resultKey = 'nature-relaxed';
    else if (food && busy) resultKey = 'foodie-busy';
    else if (adventure) resultKey = 'photo-adventure';

    const result = quizRecommendations[resultKey];
    
    unlockAchievement('quizCompleted');
    setShowResult(true);
  };

  if (showResult) {
    const nature = answers[1]?.includes('日') || answers[1]?.includes('自然');
    const food = answers[0]?.includes('美食');
    const adventure = answers[3]?.includes('冒險');
    const busy = answers[3]?.includes('熱鬧');

    let resultKey = 'cultural-relaxed';
    if (nature) resultKey = 'nature-relaxed';
    else if (food && busy) resultKey = 'foodie-busy';
    else if (adventure) resultKey = 'photo-adventure';

    const result = quizRecommendations[resultKey];

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="text-center">
            <div className="text-7xl mb-4">{result.icon}</div>
            <h1 className="text-4xl font-bold mb-4">🎉 你是：</h1>
            <h2 className="text-3xl font-bold mb-6 text-yellow-600">《{result.title}》</h2>
            
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 p-6 rounded-xl mb-8 text-lg font-semibold">
              {result.advice}
            </div>

            <h3 className="text-2xl font-bold mb-6">🎯 推薦景點：</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {result.recommendations.map((name, idx) => {
                const attraction = taiwanAttractions.find(a => a.name === name);
                return (
                  <div key={idx} className="bg-pink-100 p-4 rounded-lg">
                    <div className="text-3xl mb-2">{attraction?.icon}</div>
                    <div className="font-bold">{name}</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
            >
              🔄 重新測驗
            </button>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">❓ 旅行偏好測驗</h1>
          <p className="text-gray-600">找出最適合你的旅行風格</p>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-8">
          <div
            className="bg-yellow-400 h-3 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <Card className="mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            問題 {currentQuestion + 1}/{questions.length}
          </h2>
          <p className="text-2xl font-bold text-center mb-8">{question.question}</p>

          <div className="space-y-4 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => selectAnswer(option)}
                className={`w-full p-6 rounded-xl font-bold text-lg transition-all ${
                  answers[currentQuestion] === option
                    ? 'bg-yellow-400 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-yellow-300 hover:bg-yellow-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-300 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← 上一題
            </button>
            
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              className="px-6 py-3 bg-yellow-400 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500"
            >
              {currentQuestion === questions.length - 1 ? '看結果 →' : '下一題 →'}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
