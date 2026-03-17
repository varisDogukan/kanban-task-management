import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import Sidebar from "@components/shared/Sidebar";
import { useUiStore } from "@features/ui/store/uiStore";
import { useThemeStore } from "@features/theme/store/themeStore";
import styles from "./AppLayout.module.scss";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const theme = useThemeStore((state) => state.theme);
  const { isSidebarOpen, openSidebar } = useUiStore(
    useShallow((state) => ({
      isSidebarOpen: state.isSidebarOpen,
      openSidebar: state.openSidebar,
    })),
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        {isSidebarOpen ? <Sidebar /> : null}

        <main className={styles.content}>{children}</main>
      </div>

      {!isSidebarOpen ? (
        <button
          type='button'
          onClick={openSidebar}
          className={styles.showSidebarButton}
        >
          Show Sidebar
        </button>
      ) : null}
    </div>
  );
}
