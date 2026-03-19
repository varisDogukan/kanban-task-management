import styles from "./NewColumnLane.module.scss";

/**
 * Renders the placeholder lane used to create a new board column.
 */
export default function NewColumnLane() {
  return (
    <button type='button' className={styles.root}>
      + New Column
    </button>
  );
}
