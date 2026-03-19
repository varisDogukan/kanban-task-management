import { useUiStore } from "@features/ui/store/uiStore";
import type { Task } from "../types/board.types";
import styles from "./TaskCard.module.scss";

type TaskCardProps = {
  task: Task;
};

/**
 * Renders a kanban task card with its title and completed subtask summary.
 */
export default function TaskCard({ task }: TaskCardProps) {
  const openTaskDetails = useUiStore((state) => state.openTaskDetails);

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  return (
    <button
      type='button'
      className={styles.root}
      onClick={() => openTaskDetails(task.id)}
    >
      <span className={styles.title}>{task.title}</span>

      <span className={styles.meta}>
        {completedSubtasks} of {task.subtasks.length} subtasks
      </span>
    </button>
  );
}
