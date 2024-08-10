"use client";
import { useReducer, useRef, useState } from "react";
import styles from "./GuessNumber.module.css";

// 1~20
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export const GuessNumber = () => {
  const [time, setTime] = useState(0);
  const timer = useRef<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [correctNumber, setCorrectNumber] = useState<number>();
  const [resetKey, updateResetKey] = useReducer((prev: number) => prev + 1, 0);
  const [serif, setSerif] = useState<string>("あそぶ？❤");
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.Timer}>{time.toFixed(1)}s</div>

      <button
        className={styles.StartButton}
        type="button"
        onClick={() => {
          if (isStarted) {
            setIsStarted(false);
            setTime(0);
            if (timer.current !== null) {
              window.clearInterval(timer.current);
            }
          } else {
            setIsStarted(true);
            setTime(0);
            setCount(0);
            setCorrectNumber(
              numbers[Math.floor(Math.random() * numbers.length)]
            );
            updateResetKey();
            setSerif("数字をえらんで❤");
            timer.current = window.setInterval(() => {
              setTime((prev) => (prev * 10 + 1) / 10);
            }, 100);
          }
        }}
      >
        {serif}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=望月のあの数当てゲームでスコア「${serif}」を獲得したよ！&url=https://mochizukinoa.com/guess-number`}
        target="_blank"
        rel="noopener noreferrer"
      >
        結果をXで共有する
      </a>
      <div>
        <img
          src="/mesugaki/dummy.webp"
          alt="望月のあ"
          width="300px"
          className={styles.Avatar}
        />
      </div>
      <div className={styles.NumbersGroup}>
        {numbers.map((number) => (
          <label key={number} className={styles.Number}>
            <span
              className={styles.Number__back}
              data-correct={number === correctNumber}
            >
              {number}
            </span>
            <span className={styles.Number__front}>
              <input
                type="radio"
                name={`number-${number}`}
                key={resetKey}
                value={number}
                disabled={isStarted === false}
                onChange={() => {
                  if (number === correctNumber) {
                    if (timer.current !== null) {
                      window.clearInterval(timer.current);
                    }
                    setIsStarted(false);
                    if (time < 5) {
                      setSerif("すっご～い❤");
                    } else if (time < 8) {
                      setSerif("がんばれ❤がんばれ❤");
                    } else if (time < 20) {
                      setSerif("ざぁこ❤");
                    } else {
                      setSerif("なっさけな〜い❤");
                    }
                  } else {
                    if (correctNumber === undefined) {
                      throw new Error("correctNumber is undefined");
                    }
                    if (count > 2) {
                      setSerif("もうあきた❤");
                      setIsStarted(false);
                      if (timer.current !== null) {
                        window.clearInterval(timer.current);
                      }
                    } else if (number < correctNumber) {
                      setSerif("ちっさ❤");
                    } else {
                      setSerif("でっか❤");
                    }
                    setCount((prev) => prev + 1);
                  }
                }}
              />
              {number}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
