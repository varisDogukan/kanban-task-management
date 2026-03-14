import type { Column } from "../types/board.types";
import TaskCard from "./TaskCard";
import styles from "./BoardColumn.module.scss";

type BoardColumnProps = {
  column: Column;
};

export default function BoardColumn({ column }: BoardColumnProps) {
  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <h3 className={styles.title}>{column.name}</h3>
        <p className={styles.taskCount}>{column.tasks.length}</p>
      </header>

      <div className={styles.tasks}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </article>
  );
}
