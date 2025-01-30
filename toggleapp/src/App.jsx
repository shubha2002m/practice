import React, { useState, useEffect } from 'react';

// Singleton Pattern: Centralized storage for the theme in localStorage
class ThemeStorage {
  static getMode() {
    return localStorage.getItem('mode');
  }

  static setMode(mode) {
    localStorage.setItem('mode', mode);
  }
}

// Factory Pattern: Generate theme objects based on the mode
const themeFactory = (mode) => {
  const themes = {
    light: {
      backgroundColor: 'white',
      color: 'black',
    },
    dark: {
      backgroundColor: 'black',
      color: 'white',
    },
  };

  return themes[mode] || themes.light; // Default to light mode
};

// Strategy Pattern: Change mode strategy based on the current mode
const toggleModeStrategy = (currentMode) => {
  return currentMode === 'dark' ? 'light' : 'dark'; // Toggle between dark and light
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On component mount, check the stored mode from localStorage
  useEffect(() => {
    const savedMode = ThemeStorage.getMode();
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    } else {
      // Default to light mode if no mode is stored
      setIsDarkMode(false);
    }
  }, []);

  // Toggling the mode
  const toggleMode = () => {
    const newMode = toggleModeStrategy(isDarkMode ? 'dark' : 'light');
    ThemeStorage.setMode(newMode); // Save the new mode in localStorage
    setIsDarkMode(newMode === 'dark'); // Update state based on the new mode
  };

  // Get the current theme object based on the mode
  const currentTheme = themeFactory(isDarkMode ? 'dark' : 'light');

  useEffect(() => {
    // Apply the theme styles globally
    document.body.style.backgroundColor = currentTheme.backgroundColor;
    document.body.style.color = currentTheme.color;
    document.body.style.transition = 'background-color 0.3s, color 0.3s'; // Smooth transition
  }, [isDarkMode]);

  return (
    <div>
      <h1>Light/Dark Mode Toggle</h1>
      <button onClick={toggleMode}>
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default App;
