import AppLayout from "@app/AppLayout";
import BoardPage from "@features/boards/components/BoardPage";
import { useBoardStore } from "@features/boards/store/boardStore";

function App() {
  const selectedBoard = useBoardStore((state) => {
    return (
      state.boards.find((board) => board.id === state.selectedBoardId) ?? null
    );
  });

  return (
    <AppLayout>
      <h1>Kanban App</h1>

      {selectedBoard ? (
        <BoardPage board={selectedBoard} />
      ) : (
        <p>Selected board not found.</p>
      )}
    </AppLayout>
  );
}

export default App;
