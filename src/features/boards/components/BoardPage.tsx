import BoardColumn from "./BoardColumn";
import type { Board } from "../types/board.types";

type BoardPageProps = {
  board: Board;
};

export default function BoardPage({ board }: BoardPageProps) {
  return (
    <section>
      <h2>{board.name}</h2>

      <div>
        {board.columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>
    </section>
  );
}
