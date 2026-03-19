import type { Task } from "../types/board.types";

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
    <div role='dialog'>
      <button type='button' onClick={onClose}>
        Close
      </button>

      <h2 id={`task-dialog-${task.id}`}>{task.title}</h2>

      {task.description ? <p>{task.description}</p> : null}
    </div>
  );
}
