import { useShallow } from "zustand/react/shallow";
import AppLayout from "@app/AppLayout";
import {
  BoardHeader,
  BoardPage,
  TaskDetailsDialog,
} from "@features/boards/components";
import { useBoardStore } from "@features/boards/store/boardStore";
import { useUiStore } from "@features/ui/store/uiStore";

export default function App() {
  const selectedBoard = useBoardStore((state) => {
    return (
      state.boards.find((board) => board.id === state.selectedBoardId) ?? null
    );
  });

  const { closeTaskDetails, selectedTaskId } = useUiStore(
    useShallow((state) => ({
      selectedTaskId: state.selectedTaskId,
      closeTaskDetails: state.closeTaskDetails,
    })),
  );

  const selectedTask =
    selectedBoard?.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === selectedTaskId) ?? null;

  return (
    <AppLayout>
      {selectedBoard ? (
        <>
          <BoardHeader
            title={selectedBoard.name}
            isAddTaskDisabled={selectedBoard.columns.length === 0}
          />
          <BoardPage board={selectedBoard} />
        </>
      ) : (
        <p>Selected board not found.</p>
      )}

      {selectedTask ? (
        <TaskDetailsDialog task={selectedTask} onClose={closeTaskDetails} />
      ) : null}
    </AppLayout>
  );
}
