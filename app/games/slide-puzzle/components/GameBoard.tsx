"use client";

import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css';

export default function GameBoard() {
  const [board, setBoard] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // 初期化
  useEffect(() => {
    initializeBoard();
  }, []);

  // ボードの初期化
  const initializeBoard = () => {
    const initialBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    setBoard(shuffleBoard(initialBoard));
    setMoves(0);
    setIsComplete(false);
  };

  // ボードをシャッフル
  const shuffleBoard = (boardToShuffle: number[]) => {
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
  };

  // 移動可能なマスのインデックスを取得
  const getMovableIndices = (emptyIndex: number) => {
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
  };

  // タイルを移動
  const moveTile = (index: number) => {
    const emptyIndex = board.indexOf(8);
    const movableIndices = getMovableIndices(emptyIndex);

    if (movableIndices.includes(index)) {
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        [newBoard[emptyIndex], newBoard[index]] = [newBoard[index], newBoard[emptyIndex]];
        console.log('現在の配列:', newBoard);
        return newBoard;
      });
      setMoves(prev => prev + 1);
      checkCompletion();
    }
  };

  // パズルが完成したかチェック
  const checkCompletion = () => {
    const isCompleted = board.every((value, index) => value === index);
    setIsComplete(isCompleted);
  };

  // シャッフルボタンのクリックハンドラ
  const handleShuffle = () => {
    initializeBoard();
    console.log('シャッフル後の配列:', board);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {board.map((value, index) => (
          <div
            key={index}
            className={`${styles.tile} ${value === 8 ? styles.empty : ''}`}
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
          >
            {value !== 8 && value}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <p>移動回数: {moves}</p>
        <button onClick={handleShuffle}>シャッフル</button>
      </div>
      {isComplete && (
        <div className={styles.complete}>
          <div className={styles.completeMessage}>完成！</div>
        </div>
      )}
    </div>
  );
} 