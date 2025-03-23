"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toRomaji } from "wanakana";
import styles from "./page.module.css";

interface ResultMessage {
	message: string;
	image: string | null;
}

export default function TypingGame() {
	const [text, setText] = useState("");
	const [input, setInput] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60);
	const [totalChars, setTotalChars] = useState(0);
	const [correctWords, setCorrectWords] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [missCount, setMissCount] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	// ローマ字の異体字マッピング
	const romajiVariants: Record<string, string[]> = {
		fu: ["hu"],
		ji: ["zi"],
		zu: ["du"],
		cha: ["tya"],
		chi: ["ti"],
		chu: ["tyu"],
		cho: ["tyo"],
		sha: ["sya"],
		shi: ["si"],
		shu: ["syu"],
		sho: ["syo"],
		ja: ["zya"],
		ju: ["zyu"],
		jo: ["zyo"],
		tsu: ["tu"],
	};

	// 異体字を含むすべての可能な入力パターンを生成
	const generateAllPatterns = (romaji: string): string[] => {
		const patterns = [romaji.toLowerCase()];

		for (const [standard, variants] of Object.entries(romajiVariants)) {
			for (const variant of variants) {
				// 現在のパターンすべてに対して置換を試みる
				const currentPatterns = [...patterns];
				for (const pattern of currentPatterns) {
					// 標準形を異体字に置換
					const newPattern = pattern.replace(standard, variant);
					if (newPattern !== pattern) {
						patterns.push(newPattern);
					}
				}
			}
		}

		return [...new Set(patterns)]; // 重複を除去
	};

	const words = useMemo(
		() => [
			"うさぎ",
			"ねこ",
			"いぬ",
			"ぱんだ",
			"ひよこ",
			"くまさん",
			"はむすたー",
			"ことり",
			"りすさん",
			"あひる",
			"まんまる",
			"ふわふわ",
			"もふもふ",
			"ぷにぷに",
			"にこにこ",
			"わんわん",
			"にゃんこ",
			"ぴよぴよ",
			"うさちゃん",
			"こねこ",
			"おやつ",
			"けーき",
			"ぷりん",
			"あめちゃん",
			"くっきー",
			"わたあめ",
			"どーなつ",
			"ちょこれーと",
			"きゃんでぃ",
			"まかろん",
			"はーと",
			"らぶらぶ",
			"にっこり",
			"すまいる",
			"きらきら",
			"ゆめかわ",
			"めろめろ",
			"ぱきゅぱきゅ",
			"ほわほわ",
			"ぽかぽか",
		],
		[],
	);

	useEffect(() => {
		audioRef.current = new Audio("/sounds/miss.mp3");
	}, []);

	const startGame = useCallback(() => {
		setIsPlaying(true);
		setGameOver(false);
		setTimeLeft(60);
		setTotalChars(0);
		setCorrectWords(0);
		setMissCount(0);
		setInput("");
		setText(words[Math.floor(Math.random() * words.length)]);
		// 入力フィールドにフォーカスを設定
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	}, [words]);

	// キーボードイベントのハンドラー
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (!isPlaying && !gameOver && e.code === "Space") {
				e.preventDefault();
				startGame();
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [isPlaying, gameOver, startGame]);

	const resetGame = useCallback(() => {
		setIsPlaying(false);
		setGameOver(false);
		setTimeLeft(60);
		setTotalChars(0);
		setCorrectWords(0);
		setMissCount(0);
		setInput("");
		setText("");
	}, []);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isPlaying && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						setIsPlaying(false);
						setGameOver(true);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [isPlaying, timeLeft]);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isPlaying || gameOver) return;

		const value = e.target.value.toLowerCase();
		const romajiText = toRomaji(text);
		const possiblePatterns = generateAllPatterns(romajiText);

		// 入力文字が正しいかチェック（ローマ字のみ）
		const isValidRomaji = possiblePatterns.some((pattern) =>
			pattern.startsWith(value),
		);
		if (isValidRomaji) {
			setInput(value);

			// 単語が完成したかチェック
			if (possiblePatterns.includes(value)) {
				setTotalChars((prev) => prev + text.length);
				setCorrectWords((prev) => prev + 1);
				setText(words[Math.floor(Math.random() * words.length)]);
				setInput("");
			}
		} else {
			// 入力ミス時
			setMissCount((prev) => prev + 1);
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play().catch(console.error);
			}
		}
	};

	const getResultMessage = (chars: number): ResultMessage => {
		if (chars >= 200) {
			return {
				message: "すごい！もちのあちゃんが感動してるよ！",
				image: "/images/sugoi.jpg",
			};
		}
		if (chars >= 120) {
			return {
				message: "まあまあ！もちのあちゃんが褒めてるよ！",
				image: "/images/maamaa.jpg",
			};
		}
		return {
			message: "もっと頑張るともちのあちゃんが褒めてくれるよ",
			image: null,
		};
	};

	const handleShare = () => {
		const shareText = `${totalChars}文字入力達成！\n正解単語数: ${correctWords}語\nミス回数: ${missCount}回\n\n#もちのあタイピング\nhttps://mochinoa.com/games/typing`;
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
			"_blank",
		);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>もちのあタイピング</h1>
			<div className={styles.game}>
				{!isPlaying && !gameOver ? (
					<>
						<p className={styles.description}>
							1分間でかわいい単語をたくさん入力しよう！
						</p>
						<p className={styles.description}>ローマ字で入力してください</p>
						<button
							type="button"
							onClick={startGame}
							className={styles.startButton}
						>
							スタート
						</button>
						<p className={styles.keyHint}>スペースキーでもスタートできます</p>
					</>
				) : gameOver ? (
					<div className={styles.result}>
						<div className={styles.resultContent}>
							<div className={styles.resultText}>
								<h2>結果発表</h2>
								<p>入力文字数: {totalChars}文字</p>
								<p>正解単語数: {correctWords}語</p>
								<p>ミス回数: {missCount}回</p>
								<p>1分間の入力速度: {totalChars}文字/分</p>
								<div className={styles.resultMessage}>
									<p>{getResultMessage(totalChars).message}</p>
								</div>
								<button
									type="button"
									onClick={resetGame}
									className={styles.startButton}
								>
									もう一度チャレンジ
								</button>
								<button
									type="button"
									onClick={handleShare}
									className={styles.shareButton}
								>
									Xでシェア
								</button>
							</div>
							{getResultMessage(totalChars).image !== null && (
								<div className={styles.resultImage}>
									<Image
										src={
											getResultMessage(totalChars).image ??
											"/images/default.jpg"
										}
										alt="結果画像"
										width={600}
										height={400}
										className={styles.resultImage}
									/>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className={styles.playArea}>
						<div className={styles.stats}>
							<p>残り時間: {timeLeft}秒</p>
							<p>入力文字数: {totalChars}文字</p>
							<p>正解単語数: {correctWords}語</p>
							<p>ミス回数: {missCount}回</p>
						</div>
						<div className={styles.text}>{text}</div>
						<div className={styles.romaji}>{toRomaji(text)}</div>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={handleInput}
							placeholder="ローマ字で入力してください"
							className={styles.input}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
