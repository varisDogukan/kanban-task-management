import EmptyBoardState from "./EmptyBoardState";
import BoardColumn from "./BoardColumn";
import type { Board } from "../types/board.types";

type BoardPageProps = {
  board: Board;
};

export default function BoardPage({ board }: BoardPageProps) {
  if (board.columns.length === 0) {
    return <EmptyBoardState />;
  }

  return (
    <section
      role='tabpanel'
      id={`panel-${board.id}`}
      aria-labelledby={`tab-${board.id}`}
    >
      <h2>{board.name}</h2>

      <div>
        {board.columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>
    </section>
  );
}
