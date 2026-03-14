import styles from "./BoardHeader.module.scss";

type BoardHeaderProps = {
  title: string;
  isAddTaskDisabled: boolean;
};

export default function BoardHeader({
  title,
  isAddTaskDisabled,
}: BoardHeaderProps) {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>{title}</h1>

      <button
        type='button'
        disabled={isAddTaskDisabled}
        className={styles.action}
      >
        + Add New Task
      </button>
    </header>
  );
}
