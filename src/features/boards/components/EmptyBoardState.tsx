import styles from "./EmptyBoardState.module.scss";

/**
 * Renders the empty board placeholder when no columns exist yet.
 */
function EmptyBoardState() {
  return (
    <section className={styles.root}>
      <p className={styles.message}>
        This board is empty. Create a new column to get started.
      </p>

      <button type='button' className={styles.action}>
        + Add New Column
      </button>
    </section>
  );
}

export default EmptyBoardState;
