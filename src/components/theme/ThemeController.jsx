// components/ThemeInitializer.jsx
import { useEffect } from "react";
import { useThemeStore } from "../../store/useThemeStore";

const ThemeInitializer = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return null;
};

export default ThemeInitializer;
