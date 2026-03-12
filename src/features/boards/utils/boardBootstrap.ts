import type { Board } from "../types/board.types";
import rawData from "../data/data.json";

export function getInitialBoards(): Board[] {
  return rawData.boards as Board[];
}
