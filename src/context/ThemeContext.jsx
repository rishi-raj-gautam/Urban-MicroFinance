import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false; // Default to light mode for testing
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = darkMode
    ? {
        mode: 'dark',
        bg: 'bg-gray-900',
        panel: 'bg-gray-800/50 backdrop-blur-sm',
        cardBg: 'bg-gray-800/50 backdrop-blur-sm',
        border: 'border-gray-700',
        text: 'text-gray-100',
        textMuted: 'text-gray-400',
        subtle: 'bg-gray-800/50',
        hover: 'hover:bg-gray-700/50',
        chip: {
          base: 'px-2.5 py-1 rounded-full text-xs font-medium border',
          green: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20',
          yellow: 'bg-amber-500/10 text-amber-400 border-amber-400/20',
          red: 'bg-rose-500/10 text-rose-400 border-rose-400/20',
          blue: 'bg-blue-500/10 text-blue-400 border-blue-400/20',
        },
      }
    : {
        mode: 'light',
        bg: 'bg-gray-50',
        panel: 'bg-white/80 backdrop-blur-sm',
        cardBg: 'bg-white/80 backdrop-blur-sm',
        border: 'border-gray-200',
        text: 'text-gray-900',
        textMuted: 'text-gray-600',
        subtle: 'bg-gray-100',
        hover: 'hover:bg-gray-100',
        chip: {
          base: 'px-2.5 py-1 rounded-full text-xs font-medium border',
          green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          yellow: 'bg-amber-50 text-amber-700 border-amber-200',
          red: 'bg-rose-50 text-rose-700 border-rose-200',
          blue: 'bg-blue-50 text-blue-700 border-blue-200',
        },
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
