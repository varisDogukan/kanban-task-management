import React, { useEffect } from "react";

import Sidebar from "@components/shared/Sidebar";
import { useUiStore } from "@features/ui/store/uiStore";
import { useThemeStore } from "@features/theme/store/themeStore";
import styles from "./AppLayout.module.scss";

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
    <div className={styles.root}>
      <div className={styles.toolbar}>
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
      </div>

      <div className={styles.shell}>
        {isSidebarOpen ? <Sidebar /> : null}

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
