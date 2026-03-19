import type { Task } from "../types/board.types";
import styles from "./TaskDetailsDialog.module.scss";

type TaskDetailsDialogProps = {
  task: Task;
  onClose: () => void;
};

/**
 * Renders a minimal task details dialog shell for the selected task.
 */
export default function TaskDetailDialog({
  task,
  onClose,
}: TaskDetailsDialogProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby={`task-dialog-${task.id}`}
      className={styles.overlay}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id={`task-dialog-${task.id}`} className={styles.title}>
            {task.title}
          </h2>

          <button
            type='button'
            onClick={onClose}
            className={styles.closeButton}
          >
            Close
          </button>
        </div>

        {task.description ? (
          <p className={styles.description}>{task.description}</p>
        ) : null}
      </div>
    </div>
  );
}
