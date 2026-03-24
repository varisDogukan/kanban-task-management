import { useEffect, useRef, useState } from "react";

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
 * Renders the task details dialog for the selected task.
 */
export default function TaskDetailsDialog({
  task,
  statusOptions,
  onClose,
}: TaskDetailsDialogProps) {
  const actionsButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { toggleSubtask, updateTaskStatus } = useBoardStore(
    useShallow((state) => ({
      toggleSubtask: state.toggleSubtask,
      updateTaskStatus: state.updateTaskStatus,
    })),
  );

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node | null;

      if (!menuWrapperRef.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

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

    actionsButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusedElementRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby={`task-dialog-${task.id}`}
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id={`task-dialog-${task.id}`} className={styles.title}>
            {task.title}
          </h2>

          <div className={styles.menuWrapper} ref={menuWrapperRef}>
            <button
              type='button'
              ref={actionsButtonRef}
              className={styles.closeButton}
              aria-expanded={isMenuOpen}
              aria-haspopup='menu'
              aria-controls={`task-actions-menu-${task.id}`}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <VisuallyHidden>Open task actions</VisuallyHidden>
              <img src={ellipsisIcon} alt='' aria-hidden='true' />
            </button>

            {isMenuOpen ? (
              <div
                id={`task-actions-menu-${task.id}`}
                role='menu'
                className={styles.menu}
              >
                <button
                  type='button'
                  role='menuitem'
                  className={styles.menuItem}
                >
                  Edit Task
                </button>

                <button
                  type='button'
                  role='menuitem'
                  className={`${styles.menuItem} ${styles.menuItemDanger}`}
                >
                  Delete Task
                </button>
              </div>
            ) : null}
          </div>
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
