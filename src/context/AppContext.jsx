import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dailyGoal, setDailyGoal] = useState(() => {
    return Number(localStorage.getItem('dailyGoal')) || 8;
  });
  
  const [glassesCount, setGlassesCount] = useState(() => {
    const saved = localStorage.getItem('glassesCount');
    const lastReset = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      localStorage.setItem('glassesCount', '0');
      localStorage.setItem('lastResetDate', today);
      return 0;
    }
    return Number(saved) || 0;
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'User';
  });

  const [reminderInterval, setReminderInterval] = useState(() => {
    return Number(localStorage.getItem('reminderInterval')) || 60;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal);
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('glassesCount', glassesCount);
  }, [glassesCount]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('reminderInterval', reminderInterval);
  }, [reminderInterval]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check for midnight reset periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      const lastReset = localStorage.getItem('lastResetDate');
      if (lastReset !== today) {
        setGlassesCount(0);
        localStorage.setItem('lastResetDate', today);
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const addGlass = () => {
    setGlassesCount(prev => prev + 1);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{
      dailyGoal, setDailyGoal,
      glassesCount, setGlassesCount,
      addGlass,
      userName, setUserName,
      reminderInterval, setReminderInterval,
      theme, toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
