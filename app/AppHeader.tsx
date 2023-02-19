import Image from "next/image";
import Link from "next/link";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
  return (
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
  );
};
