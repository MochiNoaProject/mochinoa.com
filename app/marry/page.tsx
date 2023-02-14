import { MarryOff } from "./MarryOff";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <header className={styles.header}>
        <Link href="/">
          <Image
            priority
            width={146}
            height={(146 / 400) * 155}
            src="/img/logo.png"
            alt="望月のあ Official Site"
          />
        </Link>
      </header>
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
