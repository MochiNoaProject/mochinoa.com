"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

interface Obstacle {
	x: number;
	width: number;
	height: number;
	type: "small" | "medium" | "large";
}

// ゲームの設定
const GAME_SPEED = 12;
const JUMP_HEIGHT = 150; // 180から150に戻す
const JUMP_DURATION = 300; // 400から300にさらに短縮
const JUMP_COOLDOWN = 600; // ジャンプのクールダウン時間（ミリ秒）
const BASE_INTERVAL = 1500; // 基本間隔を1.5秒に短縮
const MIN_INTERVAL = 400; // 最小間隔を0.4秒に短縮
const SPEED_INCREASE = 0.003; // スコアに応じた速度増加率
const RANDOM_FACTOR = 0.8; // ランダム性を0.8（±80%）に増加

// 障害物の設定
const OBSTACLE_TYPES = {
	small: { width: 20, height: 30, shape: "square" },
	medium: { width: 30, height: 50, shape: "circle" },
	large: { width: 40, height: 70, shape: "triangle" },
};

export default function MochinoaJump() {
	const router = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [score, setScore] = useState(0);
	const scoreRef = useRef(0);
	const scoreDisplayRef = useRef<HTMLDivElement>(null);
	const [gameOver, setGameOver] = useState(false);
	const [isJumping, setIsJumping] = useState(false);
	const gameRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<HTMLDivElement>(null);
	const obstaclesRef = useRef<Obstacle[]>([]);
	const animationFrameRef = useRef<number | undefined>(undefined);
	const lastObstacleTimeRef = useRef<number>(0);
	const lastJumpTimeRef = useRef<number>(0); // 最後のジャンプ時間を記録

	// ジャンプの処理
	const jump = useCallback(() => {
		const now = Date.now();
		if (
			!isJumping &&
			isPlaying &&
			!gameOver &&
			now - lastJumpTimeRef.current >= JUMP_COOLDOWN
		) {
			setIsJumping(true);
			lastJumpTimeRef.current = now; // ジャンプ時間を記録
			const player = playerRef.current;
			if (player) {
				player.style.transform = `translateY(-${JUMP_HEIGHT}px)`;
				setTimeout(() => {
					player.style.transform = "translateY(0)";
					setIsJumping(false);
				}, JUMP_DURATION);
			}
		}
	}, [isJumping, isPlaying, gameOver]);

	// ゲームの開始
	const startGame = useCallback(() => {
		setIsPlaying(true);
		setGameOver(false);
		setScore(0);
		scoreRef.current = 0;
		if (scoreDisplayRef.current) {
			scoreDisplayRef.current.textContent = "スコア: 0";
		}
		obstaclesRef.current = [];
		lastObstacleTimeRef.current = 0;
		lastJumpTimeRef.current = 0; // ジャンプ時間をリセット
		if (playerRef.current) {
			playerRef.current.style.transform = "translateY(0)";
		}
		setIsJumping(false);
	}, []);

	// ゲームのリセット
	const resetGame = useCallback(() => {
		startGame();
	}, [startGame]);

	// キーボードイベントの処理
	const handleKeyPress = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === "Space") {
				if (!isPlaying) {
					startGame();
				} else if (gameOver) {
					resetGame();
				} else if (!isJumping) {
					// ジャンプ中でない場合のみジャンプを実行
					jump();
				}
			}
		},
		[isPlaying, gameOver, isJumping, startGame, resetGame, jump],
	);

	const handleKeyPressRef = useRef(handleKeyPress);
	useEffect(() => {
		handleKeyPressRef.current = handleKeyPress;
	}, [handleKeyPress]);

	useEffect(() => {
		const listener = (e: KeyboardEvent) => handleKeyPressRef.current(e);
		window.addEventListener("keydown", listener);
		return () => window.removeEventListener("keydown", listener);
	}, []);

	// スコアに基づいて障害物の間隔を計算
	const getObstacleInterval = useCallback(() => {
		// スコアに応じて基本間隔を減少
		const baseInterval = BASE_INTERVAL - scoreRef.current * SPEED_INCREASE;

		// ランダム性を加味した最小・最大間隔の計算
		const minInterval = Math.max(
			baseInterval * (1 - RANDOM_FACTOR),
			MIN_INTERVAL,
		);
		const maxInterval = baseInterval * (1 + RANDOM_FACTOR);

		// よりランダムな分布を実現するために二つの乱数を組み合わせる
		const random1 = Math.random();
		const random2 = Math.random();
		const randomFactor = (random1 + random2) / 2; // より自然な分布を生成

		return minInterval + (maxInterval - minInterval) * randomFactor;
	}, [score]);

	// 障害物の生成
	const createObstacle = useCallback(() => {
		const now = Date.now();
		const interval = getObstacleInterval();
		if (now - lastObstacleTimeRef.current >= interval) {
			lastObstacleTimeRef.current = now;

			// ランダムな障害物タイプを選択
			const types = Object.keys(OBSTACLE_TYPES) as Array<
				keyof typeof OBSTACLE_TYPES
			>;
			const randomType = types[Math.floor(Math.random() * types.length)];
			const obstacleConfig = OBSTACLE_TYPES[randomType];

			obstaclesRef.current.push({
				x: gameRef.current?.clientWidth || 800,
				width: obstacleConfig.width,
				height: obstacleConfig.height,
				type: randomType,
			});
		}
	}, [getObstacleInterval]);

	// 衝突判定
	const checkCollision = useCallback((player: DOMRect, obstacle: Obstacle) => {
		// プレイヤーの位置を取得
		const playerLeft = player.left;
		const playerRight = player.right;
		const playerTop = player.top;
		const playerBottom = player.bottom;

		// 障害物の位置を取得
		const obstacleLeft = obstacle.x;
		const obstacleRight = obstacle.x + obstacle.width;
		const groundLine = gameRef.current?.getBoundingClientRect().bottom || 0;
		const obstacleBottom = groundLine;
		const obstacleTop = groundLine - obstacle.height;

		// 衝突判定（左右と上下）
		const hasCollision =
			playerLeft < obstacleRight &&
			playerRight > obstacleLeft &&
			playerBottom > obstacleTop &&
			playerTop < obstacleBottom;

		return hasCollision;
	}, []);

	// ゲームオーバー処理
	const handleGameOver = useCallback(() => {
		if (!gameOver) {
			const finalScore = scoreRef.current;
			setScore(finalScore);
			setIsPlaying(false);
			setGameOver(true);

			// 結果ページに遷移
			setTimeout(() => {
				router.push(`/games/mochinoa-jump/result?score=${finalScore}`);
			}, 0);
		}
	}, [gameOver, router]);

	// ゲームループ
	const gameLoopRef = useRef(() => {});
	const gameLoop = useCallback(() => {
		if (!isPlaying || gameOver) return;

		const player = playerRef.current;
		const game = gameRef.current;
		if (!player || !game) return;

		// スコアの更新（状態の更新を同期的に行う）
		scoreRef.current += 1;
		if (scoreDisplayRef.current) {
			scoreDisplayRef.current.textContent = `スコア: ${scoreRef.current}`;
		}

		// 障害物の生成
		createObstacle();

		// 障害物の移動と衝突判定
		const playerRect = player.getBoundingClientRect();
		let hasCollision = false;

		obstaclesRef.current = obstaclesRef.current.filter((obstacle) => {
			obstacle.x -= GAME_SPEED;
			if (checkCollision(playerRect, obstacle)) {
				hasCollision = true;
				return false;
			}
			return obstacle.x > -obstacle.width;
		});

		// 衝突が発生した場合、即座にゲームオーバー処理を実行
		if (hasCollision) {
			handleGameOver();
		}
	}, [isPlaying, gameOver, createObstacle, checkCollision, handleGameOver]);

	useEffect(() => {
		gameLoopRef.current = gameLoop;
	}, [gameLoop]);

	useEffect(() => {
		if (!isPlaying || gameOver) return;

		const loop = () => {
			gameLoopRef.current();
			animationFrameRef.current = requestAnimationFrame(loop);
		};
		animationFrameRef.current = requestAnimationFrame(loop);

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isPlaying, gameOver]);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>もちのあジャンプ</h1>
			<div className={styles.gameContainer}>
				<div ref={scoreDisplayRef} className={styles.score}>スコア: {score}</div>
				<div ref={gameRef} className={styles.game}>
					<div ref={playerRef} className={styles.player}>
						<Image
							src="/images/mochinoajump.png"
							alt="もちのあ"
							width={50}
							height={50}
							className={styles.playerImage}
						/>
					</div>
					{obstaclesRef.current.map((obstacle) => (
						<div
							key={`${obstacle.x}-${obstacle.type}`}
							className={`${styles.obstacle} ${styles[obstacle.type]}`}
							style={{
								left: `${obstacle.x}px`,
								width: `${obstacle.width}px`,
								height: `${obstacle.height}px`,
							}}
						/>
					))}
					<div className={styles.ground} />
				</div>
				{!isPlaying && !gameOver ? (
					<div className={styles.startMessage}>
						スペースキーでスタート&ジャンプ
					</div>
				) : null}
				{gameOver ? (
					<div className={styles.gameOver}>
						<p className={styles.gameOverText}>ゲームオーバー</p>
						<p className={styles.gameOverText}>スコア: {score}</p>
						<p className={styles.gameOverText}>スペースキーでリスタート</p>
					</div>
				) : null}
			</div>
		</div>
	);
}
