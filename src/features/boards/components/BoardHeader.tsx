type BoardHeaderProps = {
  title: string;
  isAddTaskDisabled: boolean;
};

export default function BoardHeader({
  title,
  isAddTaskDisabled,
}: BoardHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>

      <button type='button' disabled={isAddTaskDisabled}>
        + Add New Task
      </button>
    </header>
  );
}
