import type { Column } from "../types/board.types";

type BoardColumnProps = {
  column: Column;
};

export default function BoardColumn({ column }: BoardColumnProps) {
  return (
    <article>
      <h3>{column.name}</h3>
      <p>{column.tasks.length}</p>
    </article>
  );
}
