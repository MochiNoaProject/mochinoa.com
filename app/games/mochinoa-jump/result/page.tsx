"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { Suspense } from "react";

export default function ResultPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResultContent />
		</Suspense>
	);
}

function ResultContent() {
	const searchParams = useSearchParams();
	const score = searchParams.get("score") || "0";
	const highScore = searchParams.get("highScore") || "0";

	const shareOnX = () => {
		const text = `もちのあジャンプで${score}点獲得しました！ #もちのあジャンプ`;
		const url = "https://mochinoa.com/games/mochinoa-jump";
		const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
		window.open(shareUrl, "_blank");
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>ゲームオーバー</h1>
			<div className={styles.resultContainer}>
				<div className={styles.score}>スコア: {score}</div>
				<div className={styles.buttonContainer}>
					<Link href="/games/mochinoa-jump" className={styles.retryButton}>
						もう一度プレイ
					</Link>
					<button onClick={shareOnX} className={styles.shareButton}>
						Xで共有
					</button>
				</div>
			</div>
		</div>
	);
}
