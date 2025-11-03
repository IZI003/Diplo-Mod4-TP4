import { UseThemeContext } from "../context/ThemeContext";

export default function ThemeButton() {
  const { darkMode, toggleTheme } = UseThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-4 py-2 rounded-md shadow-md transition-colors duration-300" 
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)", hover: "var(--hover)" }} 
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
