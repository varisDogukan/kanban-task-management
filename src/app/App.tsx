import { useEffect } from "react";
import BoardPage from "../features/boards/components/BoardPage";
import { useBoardStore } from "../features/boards/store/boardStore";
import { useThemeStore } from "../features/theme/store/themeStore";
import { useUiStore } from "../features/ui/store/uiStore";

function App() {
  const { boards, selectedBoardId } = useBoardStore();
  const { theme, toggleTheme } = useThemeStore();
  const { isSidebarOpen, toggleSidebar } = useUiStore();

  const selectedBoard =
    boards.find((board) => board.id === selectedBoardId) ?? null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div>
      <button type='button' onClick={toggleTheme}>
        Toggle theme
      </button>

      <button type='button' onClick={toggleSidebar}>
        {isSidebarOpen ? "Hide Sidebar" : "Show sidebar"}
      </button>

      <div>
        {isSidebarOpen ? (
          <aside>
            <p>Sidebar placeholder</p>
          </aside>
        ) : null}

        <main>
          <h1>Kanban App</h1>

          {selectedBoard ? (
            <BoardPage board={selectedBoard} />
          ) : (
            <p>Selected board not found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
