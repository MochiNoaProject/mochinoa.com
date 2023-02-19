import { AppHeader } from "../AppHeader";
import { MarryOff } from "./MarryOff";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        <MarryOff className={styles.score} />
        <div className={styles.download_box}>
          <a
            className={styles.download_button}
            href="/img/marriage-registration.png"
            download
          >
            婚姻届をダウンロード！
          </a>
          <img
            className={styles.preview}
            src="/img/marriage-registration.png"
            alt="署名入り婚姻届"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
