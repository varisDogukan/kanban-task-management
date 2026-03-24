import { create } from "zustand";
import { getInitialBoards } from "../utils/boardBootstrap";
import type { Board } from "../types/board.types";

type BoardStore = {
  boards: Board[];
  selectedBoardId: string | null;
  setBoards: (boards: Board[]) => void;
  selectBoard: (boardId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  updateTaskStatus: (taskId: string, nextStatus: string) => void;
  deleteTask: (taskId: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => {
  const initialBoards = getInitialBoards();

  return {
    boards: initialBoards,
    selectedBoardId: initialBoards[0]?.id ?? null,

    setBoards: (boards) => set({ boards }),
    selectBoard: (boardId) => set({ selectedBoardId: boardId }),

    toggleSubtask: (taskId, subtaskId) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) => {
              if (task.id !== taskId) {
                return task;
              }

              return {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === subtaskId
                    ? {
                        ...subtask,
                        isCompleted: !subtask.isCompleted,
                      }
                    : subtask,
                ),
              };
            }),
          })),
        })),
      })),

    updateTaskStatus: (taskId, nextStatus) =>
      set((state) => ({
        boards: state.boards.map((board) => {
          let taskToMove: Board["columns"][number]["tasks"][number] | null =
            null;

          const columnsWithoutTask = board.columns.map((column) => {
            const remainingTasks = column.tasks.filter((task) => {
              if (task.id !== taskId) {
                return true;
              }

              taskToMove = {
                ...task,
                status: nextStatus,
              };

              return false;
            });

            return {
              ...column,
              tasks: remainingTasks,
            };
          });

          if (!taskToMove) {
            return board;
          }

          return {
            ...board,
            columns: columnsWithoutTask.map((column) =>
              column.name === nextStatus
                ? {
                    ...column,
                    tasks: [...column.tasks, taskToMove!],
                  }
                : column,
            ),
          };
        }),
      })),

    deleteTask: (taskId) =>
      set((state) => ({
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          })),
        })),
      })),
  };
});
