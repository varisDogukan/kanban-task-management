import AppLayout from "@app/AppLayout";
import { BoardHeader, BoardPage } from "@features/boards/components";
import { useBoardStore } from "@features/boards/store/boardStore";

function App() {
  const selectedBoard = useBoardStore((state) => {
    return (
      state.boards.find((board) => board.id === state.selectedBoardId) ?? null
    );
  });

  return (
    <AppLayout>
      {selectedBoard ? (
        <>
          <BoardHeader
            title={selectedBoard.name}
            isAddTaskDisabled={selectedBoard.columns.length === 0}
          />
          <BoardPage board={selectedBoard} />
        </>
      ) : (
        <p>Selected board not found.</p>
      )}
    </AppLayout>
  );
}

export default App;
