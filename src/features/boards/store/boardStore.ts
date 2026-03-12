import { create } from "zustand";
import { getInitialBoards } from "../utils/boardBootstrap";
import type { Board } from "../types/board.types";

type BoardStore = {
  boards: Board[];
  selectedBoardId: string | null;
  setBoards: (boards: Board[]) => void;
  selectBoard: (boardId: string) => void;
};

export const useBoardStore = create<BoardStore>((set) => {
  const initialBoards = getInitialBoards();

  return {
    boards: initialBoards,
    selectedBoardId: initialBoards[0]?.id ?? null,
    setBoards: (boards) => set({ boards }),
    selectBoard: (boardId) => set({ selectedBoardId: boardId }),
  };
});
