import { Timer } from "@/components/Timer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Timer/>
    </div>
  );
}
