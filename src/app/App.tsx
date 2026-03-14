import { useEffect } from "react";
import BoardPage from "../features/boards/components/BoardPage";
import { useBoardStore } from "../features/boards/store/boardStore";
import { useThemeStore } from "../features/theme/store/themeStore";

function App() {
  const { boards, selectedBoardId } = useBoardStore();
  const { theme, toggleTheme } = useThemeStore();

  const selectedBoard =
    boards.find((board) => board.id === selectedBoardId) ?? null;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main>
      <button type='button' onClick={toggleTheme}>
        Toggle theme
      </button>

      <h1>Kanban App</h1>

      {selectedBoard ? (
        <BoardPage board={selectedBoard} />
      ) : (
        <p>Selected board not found.</p>
      )}
    </main>
  );
}

export default App;
