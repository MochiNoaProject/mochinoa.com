"use client";

import { useState, useEffect } from 'react';
import styles from './GameBoard.module.css';

type Tile = {
  value: number;
  position: number;
};

export default function GameBoard() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // パズルの初期化
  useEffect(() => {
    initializePuzzle();
  }, []);

  // パズルの初期化関数
  const initializePuzzle = () => {
    const initialTiles = Array.from({ length: 8 }, (_, i) => ({
      value: i + 1,
      position: i
    }));
    setTiles(initialTiles);
    setMoves(0);
    setIsComplete(false);
  };

  // タイルが移動可能かチェック
  const isMovable = (tilePosition: number, emptyPosition: number) => {
    const row = Math.floor(tilePosition / 3);
    const col = tilePosition % 3;
    const emptyRow = Math.floor(emptyPosition / 3);
    const emptyCol = emptyPosition % 3;

    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  // タイルを移動
  const moveTile = (tilePosition: number) => {
    const emptyPosition = 8;
    if (!isMovable(tilePosition, emptyPosition)) return;

    setTiles(prevTiles => {
      const newTiles = prevTiles.map(tile => {
        if (tile.position === tilePosition) {
          return { ...tile, position: emptyPosition };
        }
        return tile;
      });
      return newTiles;
    });
    setMoves(prev => prev + 1);
    checkCompletion();
  };

  // パズルが完成したかチェック
  const checkCompletion = () => {
    const isCompleted = tiles.every(tile => tile.value === tile.position + 1);
    setIsComplete(isCompleted);
  };

  // パズルをシャッフル
  const shufflePuzzle = () => {
    const shuffledTiles = [...tiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledTiles[i].position;
      shuffledTiles[i].position = shuffledTiles[j].position;
      shuffledTiles[j].position = temp;
    }
    setTiles(shuffledTiles);
    setMoves(0);
    setIsComplete(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {tiles.map(tile => (
          <div
            key={tile.value}
            className={styles.tile}
            style={{
              transform: `translate(${(tile.position % 3) * 100}%, ${Math.floor(tile.position / 3) * 100}%)`
            }}
            onClick={() => moveTile(tile.position)}
          >
            {tile.value}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <p>移動回数: {moves}</p>
        <button onClick={shufflePuzzle}>シャッフル</button>
        <button onClick={initializePuzzle}>リセット</button>
      </div>
      {isComplete && <div className={styles.complete}>完成！</div>}
    </div>
  );
} 