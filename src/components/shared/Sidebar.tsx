import { useBoardStore } from "@features/boards/store/boardStore";
import { useShallow } from "zustand/react/shallow";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const { boards, selectedBoardId, selectBoard } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      selectedBoardId: state.selectedBoardId,
      selectBoard: state.selectBoard,
    })),
  );

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
                  role='tab'
                  aria-selected={isActive}
                  aria-controls={`panel-${board.id}`}
                  id={`tab-${board.id}`}
                  onClick={() => selectBoard(board.id)}
                  className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
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
