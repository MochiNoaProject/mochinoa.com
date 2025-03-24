"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

interface Obstacle {
  x: number;
  width: number;
  height: number;
  type: "small" | "medium" | "large";
}

export default function MochinoaJump() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastObstacleTimeRef = useRef<number>(0);

  // ゲームの設定
  const GAME_SPEED = 12;
  const JUMP_HEIGHT = 150;     // 180から150に戻す
  const JUMP_DURATION = 300;   // 400から300にさらに短縮
  const BASE_INTERVAL = 1500;  // 基本間隔を1.5秒に短縮
  const MIN_INTERVAL = 600;    // 最小間隔を0.6秒に短縮
  const SPEED_INCREASE = 0.003; // スコアに応じた速度増加率
  const RANDOM_FACTOR = 0.5;   // ランダム性の強さ（0.5 = ±50%）

  // 障害物の設定
  const OBSTACLE_TYPES = {
    small: { width: 20, height: 30, shape: "square" },
    medium: { width: 30, height: 50, shape: "circle" },
    large: { width: 40, height: 70, shape: "triangle" },
  };

  // ジャンプの処理
  const jump = () => {
    if (!isJumping && isPlaying && !gameOver) {
      setIsJumping(true);
      const player = playerRef.current;
      if (player) {
        player.style.transform = `translateY(-${JUMP_HEIGHT}px)`;
        setTimeout(() => {
          player.style.transform = "translateY(0)";
          setIsJumping(false);
        }, JUMP_DURATION);
      }
    }
  };

  // キーボードイベントの処理
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (!isPlaying) {
          startGame();
        } else if (gameOver) {
          resetGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, gameOver]);

  // ゲームの開始
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    obstaclesRef.current = [];
    lastObstacleTimeRef.current = 0;
    if (playerRef.current) {
      playerRef.current.style.transform = "translateY(0)";
    }
    setIsJumping(false);
  };

  // ゲームのリセット
  const resetGame = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    startGame();
  };

  // スコアに基づいて障害物の間隔を計算
  const getObstacleInterval = () => {
    const baseInterval = BASE_INTERVAL - (score * SPEED_INCREASE);
    const minInterval = Math.max(baseInterval * (1 - RANDOM_FACTOR), MIN_INTERVAL);
    const maxInterval = baseInterval * (1 + RANDOM_FACTOR);
    return Math.random() * (maxInterval - minInterval) + minInterval;
  };

  // 障害物の生成
  const createObstacle = () => {
    const now = Date.now();
    const interval = getObstacleInterval();
    if (now - lastObstacleTimeRef.current >= interval) {
      lastObstacleTimeRef.current = now;

      // ランダムな障害物タイプを選択
      const types = Object.keys(OBSTACLE_TYPES) as Array<keyof typeof OBSTACLE_TYPES>;
      const randomType = types[Math.floor(Math.random() * types.length)];
      const obstacleConfig = OBSTACLE_TYPES[randomType];

      obstaclesRef.current.push({
        x: gameRef.current?.clientWidth || 800,
        width: obstacleConfig.width,
        height: obstacleConfig.height,
        type: randomType,
      });
    }
  };

  // 衝突判定
  const checkCollision = (player: DOMRect, obstacle: Obstacle) => {
    // プレイヤーの位置を取得
    const playerLeft = player.left;
    const playerRight = player.right;
    const playerTop = player.top;
    const playerBottom = player.bottom;

    // 障害物の位置を取得
    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = 0;
    const obstacleBottom = obstacle.height;

    // 衝突判定
    return (
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      playerTop < obstacleBottom &&
      playerBottom > obstacleTop
    );
  };

  // ゲームオーバー処理
  const handleGameOver = () => {
    if (!gameOver) {
      setIsPlaying(false);
      setGameOver(true);
      // 結果ページに遷移
      router.push(`/games/mochinoa-jump/result?score=${score}&highScore=${highScore}`);
    }
  };

  // ゲームループ
  useEffect(() => {
    const gameLoop = () => {
      if (!isPlaying || gameOver) return;

      const player = playerRef.current;
      const game = gameRef.current;
      if (!player || !game) return;

      // スコアの更新
      setScore((prev) => prev + 1);

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
        return;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);
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
        <div className={styles.score}>スコア: {score}</div>
        <div className={styles.highScore}>ハイスコア: {highScore}</div>
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
          {obstaclesRef.current.map((obstacle, index) => (
            <div
              key={index}
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
        {!isPlaying && !gameOver && (
          <div className={styles.startMessage}>
            スペースキーでスタート&ジャンプ
          </div>
        )}
        {gameOver && (
          <div className={styles.gameOver}>
            <p className={styles.gameOverText}>ゲームオーバー</p>
            <p className={styles.gameOverText}>スコア: {score}</p>
            <p className={styles.gameOverText}>スペースキーでリスタート</p>
          </div>
        )}
      </div>
    </div>
  );
} 