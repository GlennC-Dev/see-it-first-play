import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

// Shared light/dark toggle — used by the desktop sidebar header (Shell.tsx) and the mobile
// profile header (ProfileHeader.tsx). Pass className to adjust placement per spot.
const ThemeToggle = ({ className = "", size = "w-8 h-8" }: { className?: string; size?: string }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={`${size} rounded-full border border-border flex items-center justify-center text-ink-soft hover:border-primary hover:text-primary transition-colors duration-200 shrink-0 ${className}`}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  );
};

export default ThemeToggle;
