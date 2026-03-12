import type { Task } from "../types/board.types";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const completedSubTasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  return (
    <article>
      <h4>{task.title}</h4>

      <p>
        {completedSubTasks} of {task.subtasks.length} subtasks
      </p>
    </article>
  );
}
