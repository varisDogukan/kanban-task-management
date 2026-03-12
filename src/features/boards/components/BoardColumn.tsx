import type { Column } from "../types/board.types";
import TaskCard from "./TaskCard";

type BoardColumnProps = {
  column: Column;
};

export default function BoardColumn({ column }: BoardColumnProps) {
  return (
    <article>
      <h3>{column.name}</h3>
      <p>{column.tasks.length}</p>

      <div>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </article>
  );
}
