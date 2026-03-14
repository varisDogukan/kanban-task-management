import React, { useEffect } from "react";

import Sidebar from "@components/shared/Sidebar";
import { useUiStore } from "@features/ui/store/uiStore";
import { useThemeStore } from "@features/theme/store/themeStore";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { isSidebarOpen, toggleSidebar } = useUiStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div>
      <button
        type='button'
        onClick={toggleTheme}
        aria-pressed={theme === "dark"}
      >
        Toggle theme
      </button>

      <button
        type='button'
        onClick={toggleSidebar}
        aria-expanded={isSidebarOpen}
        aria-controls='app-sidebar'
      >
        {isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
      </button>

      <div>
        {isSidebarOpen ? <Sidebar /> : null}

        <main>{children}</main>
      </div>
    </div>
  );
}
