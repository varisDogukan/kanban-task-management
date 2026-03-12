import { useBoardStore } from "../features/boards/store/boardStore";

export default function App() {
  const { boards, selectedBoardId } = useBoardStore();

  const selectedBoard =
    boards.find((board) => board.id === selectedBoardId) ?? null;

  return (
    <main>
      <h1>Kanban App</h1>

      {selectedBoard ? (
        <div>
          <h2>{selectedBoard.name}</h2>
          <p>Kolon sayısı: {selectedBoard.columns.length}</p>
        </div>
      ) : (
        <p>Seçili board bulunamadı.</p>
      )}
    </main>
  );
}
