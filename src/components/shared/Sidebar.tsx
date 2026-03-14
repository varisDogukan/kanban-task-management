import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "@features/boards/store/boardStore";
import { useThemeStore } from "@features/theme/store/themeStore";
import { useUiStore } from "@features/ui/store/uiStore";
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
                  {board.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <button type='button' className={styles.createButton}>
        + Create New Board
      </button>

      <div className={styles.footer}>
        <div className={styles.themePanel}>
          <span>Light</span>

          <button
            type='button'
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
          >
            Toggle theme
          </button>

          <span>Dark</span>
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
