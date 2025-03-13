"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./GameBoard.module.css";

export default function GameBoard() {
  const router = useRouter();
  const [board, setBoard] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // 移動可能なマスのインデックスを取得
  const getMovableIndices = useCallback((emptyIndex: number) => {
    const row = Math.floor(emptyIndex / 3);
    const col = emptyIndex % 3;
    const movableIndices: number[] = [];

    // 上
    if (row > 0) movableIndices.push(emptyIndex - 3);
    // 下
    if (row < 2) movableIndices.push(emptyIndex + 3);
    // 左
    if (col > 0) movableIndices.push(emptyIndex - 1);
    // 右
    if (col < 2) movableIndices.push(emptyIndex + 1);

    return movableIndices;
  }, []);

  // ボードをシャッフル
  const shuffleBoard = useCallback((boardToShuffle: number[]) => {
    const shuffled = [...boardToShuffle];
    let emptyIndex = shuffled.indexOf(8);

    for (let i = 0; i < 100; i++) {
      const movableIndices = getMovableIndices(emptyIndex);
      if (movableIndices.length > 0) {
        const randomIndex = movableIndices[Math.floor(Math.random() * movableIndices.length)];
        // 空マスと移動可能なマスを入れ替え
        [shuffled[emptyIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[emptyIndex]];
        emptyIndex = randomIndex;
      }
    }

    return shuffled;
  }, [getMovableIndices]);

  // ボードの初期化
  const initializeBoard = useCallback(() => {
    const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setBoard(shuffleBoard(initialBoard));
    setMoves(0);
    setIsComplete(false);
    setStartTime(Date.now());
  }, [shuffleBoard]);

  // 初期化
  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  // タイルを移動
  const moveTile = (index: number) => {
    if (isComplete) return;
    
    const emptyIndex = board.indexOf(8);
    const movableIndices = getMovableIndices(emptyIndex);

    if (movableIndices.includes(index)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
      setBoard(newBoard);
      setMoves(prev => prev + 1);
      
      // 状態更新後に完成チェックを実行
      const isCompleted = newBoard.every((value, idx) => value === idx);
      if (isCompleted) {
        const finalTime = Date.now() - (startTime ?? 0);
        setIsComplete(true);
        setTimeout(() => {
          router.push(`/games/slide-puzzle/complete?time=${finalTime}&moves=${moves + 1}`);
        }, 500);
      }
    }
  };

  // シャッフルボタンのクリックハンドラ
  const handleShuffle = () => {
    initializeBoard();
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {board.map((value, index) => (
          <button
            key={index}
            className={`${styles.tile} ${value === 8 ? styles.empty : ''} ${isComplete ? styles.complete : ''}`}
            style={
              value !== 8
                ? {
                    backgroundImage: `url(/images/puzzle/puzzle1.jpg)`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${-(value % 3) * 100}% ${-Math.floor(value / 3) * 100}%`,
                    transform: `translate(${(index % 3) * 100}%, ${Math.floor(index / 3) * 100}%)`
                  }
                : {
                    transform: `translate(${(index % 3) * 100}%, ${Math.floor(index / 3) * 100}%)`
                  }
            }
            onClick={() => value !== 8 && moveTile(index)}
          />
        ))}
      </div>
      <div className={styles.controls}>
        <p>移動回数: {moves}</p>
        {!isComplete && (
          <button onClick={handleShuffle}>シャッフル</button>
        )}
      </div>
    </div>
  );
}
