import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('travel-buddy-theme') || 'forest-green';
  });

  useEffect(() => {
    localStorage.setItem('travel-buddy-theme', theme);
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  const themes = [
    { id: 'forest-green', name: '🌿 森林綠', color: '#2D5016' },
    { id: 'sakura-pink', name: '🌸 櫻花粉', color: '#FFB7C5' },
    { id: 'ocean-blue', name: '🌊 海洋藍', color: '#0077B6' },
    { id: 'night-purple', name: '🌙 夜空紫', color: '#4A235A' },
  ];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
