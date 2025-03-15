"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./page.module.css";

export default function TypingGame() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const words = [
    "こんにちは",
    "タイピング",
    "ゲーム",
    "プログラミング",
    "もちのあ",
    "かわいい",
    "楽しい",
    "がんばる",
    "ありがとう",
    "さようなら"
  ];

  const startGame = useCallback(() => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setText(randomWord);
    setInput("");
    setIsPlaying(true);
    setStartTime(Date.now());
    setScore(null);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value === text) {
      const endTime = Date.now();
      const timeElapsed = endTime - (startTime ?? 0);
      const charactersPerMinute = Math.round((text.length / timeElapsed) * 60000);
      setScore(charactersPerMinute);
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>タイピングゲーム</h1>
      <div className={styles.game}>
        {!isPlaying ? (
          <button onClick={startGame} className={styles.startButton}>
            スタート
          </button>
        ) : (
          <>
            <div className={styles.text}>{text}</div>
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className={styles.input}
              autoFocus
            />
          </>
        )}
        {score && (
          <div className={styles.score}>
            スコア: {score} 文字/分
          </div>
        )}
      </div>
    </div>
  );
} 