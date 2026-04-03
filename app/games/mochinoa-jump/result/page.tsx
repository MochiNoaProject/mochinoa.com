"use client";

import Link from "next/link";
import { Suspense, use } from "react";
import styles from "./page.module.css";

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default function ResultPage({ searchParams }: Props) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResultContent searchParams={searchParams} />
		</Suspense>
	);
}

function ResultContent({ searchParams: searchParamsPromise }: Props) {
	const searchParams = use(searchParamsPromise);
	const score = searchParams.score || "0";
	const _highScore = searchParams.highScore || "0";

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
					<button
						type="button"
						onClick={shareOnX}
						className={styles.shareButton}
					>
						Xで共有
					</button>
				</div>
			</div>
		</div>
	);
}
