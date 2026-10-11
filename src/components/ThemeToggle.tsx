'use client';

import React, { useEffect, useState } from 'react';
import { Row, ToggleButton, useTheme } from '@once-ui-system/core';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';
  const icon = isDark ? 'sun' : 'moon';
  const nextTheme = isDark ? 'light' : 'dark';

  const handleThemeToggle = () => {
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('data-theme', nextTheme);
  };

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={handleThemeToggle}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
