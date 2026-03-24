import { useEffect, useRef } from "react";

import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "@features/boards/store/boardStore";
import VisuallyHidden from "@components/primitives/VisuallyHidden";
import ellipsisIcon from "@assets/icons/icon-vertical-ellipsis.svg";

import styles from "./TaskDetailsDialog.module.scss";

import type { Task } from "../types/board.types";

type TaskDetailsDialogProps = {
  task: Task;
  statusOptions: string[];
  onClose: () => void;
};

/**
 * Renders a minimal task details dialog shell for the selected task.
 */
export default function TaskDetailDialog({
  task,
  statusOptions,
  onClose,
}: TaskDetailsDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const { toggleSubtask, updateTaskStatus } = useBoardStore(
    useShallow((state) => ({
      toggleSubtask: state.toggleSubtask,
      updateTaskStatus: state.updateTaskStatus,
    })),
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    previousFocusedElementRef.current =
      document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      previousFocusedElementRef.current?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby={`task-dialog-${task.id}`}
      className={styles.overlay}
      onClick={onClose}
    >
      <div className={styles.panel} onClick={onClose}>
        <div className={styles.header}>
          <h2 id={`task-dialog-${task.id}`} className={styles.title}>
            {task.title}
          </h2>

          <button
            type='button'
            ref={closeButtonRef}
            className={styles.closeButton}
          >
            <VisuallyHidden>Open task action</VisuallyHidden>
            <img src={ellipsisIcon} alt='' aria-hidden='true' />
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

        <div className={styles.status}>
          <label
            htmlFor={`task-status-${task.id}`}
            className={styles.statusLabel}
          >
            Current Status
          </label>

          <select
            id={`task-status-${task.id}`}
            value={task.status}
            onChange={(event) => updateTaskStatus(task.id, event.target.value)}
            className={styles.statusSelect}
          >
            {statusOptions.map((statusOption) => (
              <option key={statusOption} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
