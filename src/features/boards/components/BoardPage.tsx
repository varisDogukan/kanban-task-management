import { BoardColumn, EmptyBoardState, NewColumnLane } from ".";
import styles from "./BoardPage.module.scss";

import type { Board } from "../types/board.types";

type BoardPageProps = {
  board: Board;
};

/**
 * Renders the selected board content area.
 * Shows an empty state when the board has no columns.
 */
export default function BoardPage({ board }: BoardPageProps) {
  if (board.columns.length === 0) {
    return <EmptyBoardState />;
  }

  return (
    <section
      role='tabpanel'
      id={`panel-${board.id}`}
      aria-labelledby={`tab-${board.id}`}
      className={styles.root}
    >
      <h2>{board.name}</h2>

      <div className={styles.columns}>
        {board.columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}

        <NewColumnLane />
      </div>
    </section>
  );
}
