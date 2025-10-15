import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Baca dari localStorage dan parse JSON dengan aman
    const saved = localStorage.getItem("theme");
    if (saved !== null) {
      try {
        return JSON.parse(saved); // hasilnya boolean true/false
      } catch {
        return false;
      }
    }
    return false; // default: light mode
  });

  // Terapkan tema ke <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  // Sinkronisasi antar tab/browser
  useEffect(() => {
    const syncTheme = (e) => {
      if (e.key === "theme") {
        try {
          const newTheme = JSON.parse(e.newValue);
          setIsDark(newTheme);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
