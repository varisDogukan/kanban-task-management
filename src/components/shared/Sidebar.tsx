import { useShallow } from "zustand/react/shallow";
import logoDark from "@assets/icons/logo-dark.svg";
import logoLight from "@assets/icons/logo-light.svg";
import { useUiStore } from "@features/ui/store/uiStore";
import { useThemeStore } from "@features/theme/store/themeStore";
import { useBoardStore } from "@features/boards/store/boardStore";
import boardIcon from "@assets/icons/icon-board.svg";
import darkThemeIcon from "@assets/icons/icon-dark-theme.svg";
import lightThemeIcon from "@assets/icons/icon-light-theme.svg";
import VisuallyHidden from "@components/primitives/VisuallyHidden";

import styles from "./Sidebar.module.scss";

function Sidebar() {
  const { boards, selectedBoardId, selectBoard } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      selectedBoardId: state.selectedBoardId,
      selectBoard: state.selectBoard,
    })),
  );

  const { theme, toggleTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      toggleTheme: state.toggleTheme,
    })),
  );

  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <aside id='app-sidebar' aria-label='Board sidebar' className={styles.root}>
      <div className={styles.logo}>
        <img
          src={theme === "dark" ? logoLight : logoDark}
          alt='Kanban'
          className={styles.logoImage}
        />
      </div>

      <div className={styles.body}>
        <p className={styles.heading}>ALL BOARDS ({boards.length})</p>

        <div role='tablist' aria-label='Boards' aria-orientation='horizontal'>
          <ul className={styles.list}>
            {boards.map((board) => {
              const isActive = board.id === selectedBoardId;

              return (
                <li key={board.id}>
                  <button
                    type='button'
                    role='tab'
                    aria-selected={isActive}
                    aria-controls={`panel-${board.id}`}
                    id={`tab-${board.id}`}
                    onClick={() => selectBoard(board.id)}
                    className={
                      isActive
                        ? `${styles.button} ${styles.buttonActive}`
                        : styles.button
                    }
                  >
                    <span className={styles.buttonContent}>
                      <img
                        src={boardIcon}
                        alt=''
                        aria-hidden='true'
                        className={styles.boardIcon}
                      />
                      <span>{board.name}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <button type='button' className={styles.createButton}>
          <span className={styles.buttonContent}>
            <img
              src={boardIcon}
              alt=''
              aria-hidden='true'
              className={styles.boardIcon}
            />
            <span>+ Create New Board</span>
          </span>
        </button>
      </div>

      <div className={styles.footer}>
        <div className={styles.themePanel}>
          <img
            src={lightThemeIcon}
            alt=''
            aria-hidden='true'
            className={styles.themeIcon}
          />

          <button
            type='button'
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            className={
              theme === "dark"
                ? `${styles.themeToggle} ${styles.themeToggleActive}`
                : styles.themeToggle
            }
          >
            <VisuallyHidden>Toggle color theme</VisuallyHidden>
            <span aria-hidden='true' className={styles.themeToggleThumb} />
          </button>

          <img
            src={darkThemeIcon}
            alt=''
            aria-hidden='true'
            className={styles.themeIcon}
          />
        </div>

        <button
          type='button'
          onClick={toggleSidebar}
          aria-expanded={true}
          aria-controls='app-sidebar'
          className={styles.secondaryButton}
        >
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
