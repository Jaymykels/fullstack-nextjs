"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <div className="w-5 h-5 bg-white rounded-full">light</div>
      ) : (
        <div className="w-5 h-5 bg-black rounded-full">dark</div>
      )}
    </button>
  );
};

export default ThemeSwitch;