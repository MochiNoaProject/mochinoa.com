"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";

function CompleteContent() {
	const searchParams = useSearchParams();
	const timeParam = searchParams.get("time");
	const movesParam = searchParams.get("moves");
	const time = timeParam !== null ? Number(timeParam) : 0;
	const moves = movesParam !== null ? Number(movesParam) : 0;
	const difficulty = searchParams.get("difficulty") ?? "easy";

	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}分${remainingSeconds}秒`;
	};

	const gameUrl = "https://mochinoa.com/games/slide-puzzle";
	const shareText = `もちのあスライドパズルをクリアしました！\nクリア時間: ${formatTime(time)}\n移動回数: ${moves}回\n\n${gameUrl}\n\n#もちのあスライドパズル`;
	const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>おめでとうございます！</h1>
			<div className={styles.imageContainer}>
				<Image
					src={`/images/slide-puzzle/${difficulty === "easy" ? "puzzle1" : "puzzle2"}.jpg`}
					alt="完成したパズル"
					width={300}
					height={300}
					className={styles.completedImage}
				/>
			</div>
			<div className={styles.stats}>
				<p>難易度: {difficulty === "easy" ? "初級" : "上級"}</p>
				<p>クリア時間: {formatTime(time)}</p>
				<p>移動回数: {moves}回</p>
			</div>
			<div className={styles.buttons}>
				<Link href="/games/slide-puzzle" className={styles.button}>
					もう一度プレイ
				</Link>
				<Link href="/games/slide-puzzle" className={styles.button}>
					他の難易度へ
				</Link>
			</div>
			<div className={styles.buttonContainer}>
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
		<Suspense fallback={<div>Loading...</div>}>
			<CompleteContent />
		</Suspense>
	);
}
