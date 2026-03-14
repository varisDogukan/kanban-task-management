import { useBoardStore } from "@features/boards/store/boardStore";
import { useShallow } from "zustand/react/shallow";

export default function Sidebar() {
  const { boards, selectedBoardId, selectBoard } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      selectedBoardId: state.selectedBoardId,
      selectBoard: state.selectBoard,
    })),
  );

  return (
    <aside>
      <p>ALL BOARDS ({boards.length})</p>

      <div role='tablist' aria-label='Boards' aria-orientation='horizontal'>
        <ul>
          {boards.map((board) => {
            const isActive = board.id === selectedBoardId;

            return (
              <li key={board.id}>
                <button
                  role='tab'
                  aria-selected={isActive}
                  aria-controls={`panel-${board.id}`}
                  id={`tab-${board.id}`}
                  onClick={() => selectBoard(board.id)}
                >
                  {board.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
