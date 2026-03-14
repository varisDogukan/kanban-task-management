import AppLayout from "@app/AppLayout";
import BoardPage from "@features/boards/components/BoardPage";
import { useBoardStore } from "@features/boards/store/boardStore";

function App() {
  const { boards, selectedBoardId } = useBoardStore();

  const selectedBoard =
    boards.find((board) => board.id === selectedBoardId) ?? null;

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
