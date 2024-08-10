import { AppHeader } from "../AppHeader";
import { Metadata } from "next";
import styles from "./page.module.css";

const title = "数当てゲーム";
const description =
  "1から20までの数字を当てるゲームです。なるべく早く当ててよう!";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
} satisfies Metadata;

export default function Page() {
  return (
    <div>
      <AppHeader />
      <div className={styles.container}>
        <header>
          <h1>数当てゲーム</h1>
          <p>1から20までの数字を当てるゲームです。なるべく早く当ててよう!</p>
        </header>
      </div>
    </div>
  );
}
