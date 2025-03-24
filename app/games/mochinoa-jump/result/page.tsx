"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function Result() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const highScore = searchParams.get("highScore");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ゲームオーバー</h1>
      <div className={styles.resultContainer}>
        <div className={styles.score}>スコア: {score}</div>
        <div className={styles.highScore}>ハイスコア: {highScore}</div>
        <Link href="/games/mochinoa-jump" className={styles.retryButton}>
          もう一度プレイ
        </Link>
      </div>
    </div>
  );
} 