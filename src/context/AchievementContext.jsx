import { createContext, useContext, useState, useEffect } from 'react';

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('travel-buddy-achievements');
    return saved ? JSON.parse(saved) : {
      quizCompleted: false,
      budgetPlanned: false,
      itineraryGenerated: false,
      exploredAll: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('travel-buddy-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const unlockAchievement = (achievementKey) => {
    setAchievements(prev => ({
      ...prev,
      [achievementKey]: true,
    }));
  };

  const getCompletedCount = () => {
    return Object.values(achievements).filter(Boolean).length;
  };

  const getBadges = () => {
    const badges = [];
    if (achievements.quizCompleted) badges.push({ icon: '🏅', name: '旅行新手' });
    if (achievements.budgetPlanned) badges.push({ icon: '💰', name: '預算達人' });
    if (achievements.itineraryGenerated) badges.push({ icon: '📍', name: '行程規劃師' });
    if (achievements.exploredAll) badges.push({ icon: '🗺️', name: '台灣探索家' });
    return badges;
  };

  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement, getCompletedCount, getBadges }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementProvider');
  }
  return context;
};
