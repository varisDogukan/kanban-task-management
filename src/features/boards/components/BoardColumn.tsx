import TaskCard from "./TaskCard";
import type { Column } from "../types/board.types";
import styles from "./BoardColumn.module.scss";

type BoardColumnProps = {
  column: Column;
};

/**
 * Renders a single kanban column lane with its task list.
 */
function BoardColumn({ column }: BoardColumnProps) {
  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <span aria-hidden='true' className={styles.dot} />
        <h3 className={styles.title}>
          {column.name}{" "}
          <span className={styles.count}>({column.tasks.length})</span>
        </h3>
      </header>

      <div className={styles.tasks}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </article>
  );
}

export default BoardColumn;
