import type { Board } from "../types/board.types";

type BoardPageProps = {
  board: Board;
};

export default function BoardPage({ board }: BoardPageProps) {
  return (
    <section>
      <h2>{board.name}</h2>
      <p>Kolon sayısı: {board.columns.length}</p>
    </section>
  );
}
