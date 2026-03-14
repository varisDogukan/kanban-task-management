import type { ReactNode } from "react";
import styles from "./VisuallyHidden.module.scss";

type VisuallyHiddenProps = {
  children: ReactNode;
};

export default function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className={styles.root}>{children}</span>;
}
