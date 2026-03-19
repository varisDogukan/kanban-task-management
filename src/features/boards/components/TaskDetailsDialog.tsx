import { useBoardStore } from "@features/boards/store/boardStore";
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
  const toggleSubtask = useBoardStore((state) => state.toggleSubtask);

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

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

        <section className={styles.subtasks}>
          <h3 className={styles.subtasksTitle}>
            Subtasks ({completedSubtasks} of {task.subtasks.length})
          </h3>

          <div className={styles.subtasksList}>
            {task.subtasks.map((subtask) => (
              <label key={subtask.id} className={styles.subtaskItem}>
                <input
                  type='checkbox'
                  checked={subtask.isCompleted}
                  onChange={() => toggleSubtask(task.id, subtask.id)}
                />

                <span
                  className={
                    subtask.isCompleted
                      ? `${styles.subtaskLabel} ${styles.subtaskLabelCompleted}`
                      : styles.subtaskLabel
                  }
                >
                  {subtask.title}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
