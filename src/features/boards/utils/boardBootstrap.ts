import type { Board } from "../types/board.types";
import rawData from "../data/data.json";

/**
 * Returns the initial board list bootstrapped from the challenge JSON data.
 * Adds deterministic ids for boards, columns, tasks, and subtasks.
 */
export function getInitialBoards(): Board[] {
  return rawData.boards.map((board, boardIndex) => ({
    id: `board-${boardIndex + 1}`,
    name: board.name,
    columns: board.columns.map((column, columnIndex) => ({
      id: `board-${boardIndex + 1}-column-${columnIndex + 1}`,
      name: column.name,
      tasks: column.tasks.map((task, taskIndex) => ({
        id: `board-${boardIndex + 1}-column-${columnIndex + 1}-task-${taskIndex + 1}`,
        title: task.title,
        description: task.description,
        status: task.status,
        subtasks: task.subtasks.map((subtask, subtaskIndex) => ({
          id: `board-${boardIndex + 1}-column-${columnIndex + 1}-task-${taskIndex + 1}-subtask-${subtaskIndex + 1}`,
          title: subtask.title,
          isCompleted: subtask.isCompleted,
        })),
      })),
    })),
  }));
}
