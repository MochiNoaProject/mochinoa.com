"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";

function CompleteContent() {
  const searchParams = useSearchParams();
  const clearTime = searchParams.get("time");
  const moves = searchParams.get("moves");

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

  const gameUrl = "https://mochinoa.com/games/slide-puzzle";
  const shareText = `もちのあスライドパズルをクリアしました！\nクリア時間: ${formatTime(Number(clearTime))}\n移動回数: ${moves}回\n\n${gameUrl}\n\n#もちのあスライドパズル`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>おめでとうございます！</h1>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src="/images/puzzle/puzzle1.jpg"
            alt="完成したパズル"
            className={styles.completeImage}
          />
        </div>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreItem}>
            <span className={styles.label}>クリア時間</span>
            <span className={styles.value}>
              {formatTime(Number(clearTime))}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.label}>移動回数</span>
            <span className={styles.value}>{moves}回</span>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <a href="/games/slide-puzzle" className={styles.button}>
          もう一度プレイ
        </a>
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.shareButton}`}
        >
          Xで共有
        </a>
      </div>
    </div>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<div className={styles.container}>読み込み中...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
