import { AppHeader } from "../AppHeader";
import { GuessNumber } from "./GuessNumber";
import { Metadata } from "next";
import styles from "./page.module.css";

const title = "数当てゲーム（メスガキ）";
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

      <div className={styles.Main}>
        <header>
          <h1>
            数当てゲーム
            <span className={styles.Caption}>（メスガキ）</span>
          </h1>
          <p>
            望月のあちゃん（メスガキモード）が思い浮かべている数字をなるべく早く当てよう！
            4回以内に当てられなかったら負け!
          </p>
        </header>
        <GuessNumber />
      </div>
    </div>
  );
}
