import ellipsisIcon from "@assets/icons/icon-vertical-ellipsis.svg";
import VisuallyHidden from "@components/primitives/VisuallyHidden";
import styles from "./BoardHeader.module.scss";

type BoardHeaderProps = {
  title: string;
  isAddTaskDisabled: boolean;
};

/**
 * Renders the selected board header with its primary actions.
 */
export default function BoardHeader({
  title,
  isAddTaskDisabled,
}: BoardHeaderProps) {
  return (
    <header className={styles.root}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        <button
          type='button'
          disabled={isAddTaskDisabled}
          className={styles.action}
        >
          + Add New Task
        </button>

        <button type='button' className={styles.menuButton}>
          <VisuallyHidden>Open board actions</VisuallyHidden>
          <img src={ellipsisIcon} alt='' aria-hidden='true' />
        </button>
      </div>
    </header>
  );
}
