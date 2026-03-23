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
        boards: state.boards.map((board) => ({
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: nextStatus,
                  }
                : task,
            ),
          })),
        })),
      })),
  };
});
