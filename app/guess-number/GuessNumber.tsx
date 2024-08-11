"use client";
import { useReducer, useRef, useState } from "react";
import styles from "./GuessNumber.module.css";

// 1~20
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const voiceList = [
  { src: "/mesugaki/title.mp3", text: "タイトルコール" },
  { src: "/mesugaki/がんばれがんばれ.mp3", text: "がんばれがんばれ" },
  { src: "/mesugaki/ざあこ.mp3", text: "ざあこ" },
  { src: "/mesugaki/ざあこざあこ.mp3", text: "ざあこざあこ" },
  { src: "/mesugaki/すっごーい.mp3", text: "すっごーい" },
  { src: "/mesugaki/ちっさ.mp3", text: "ちっさ" },
  { src: "/mesugaki/でっか.mp3", text: "でっか" },
  { src: "/mesugaki/なっさけない.mp3", text: "なっさけない" },
] as const;

type VoiceText = (typeof voiceList)[number]["text"];

export const GuessNumber = () => {
  const [time, setTime] = useState(0);
  const timer = useRef<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [correctNumber, setCorrectNumber] = useState<number>();
  const [resetKey, updateResetKey] = useReducer((prev: number) => prev + 1, 0);
  const [serif, setSerif] = useState<string>("あそぶ？❤");
  const [count, setCount] = useState(0);

  const play = async (text: VoiceText) => {
    const audio = document.getElementById(`audio-${text}`) as HTMLAudioElement;
    audio.currentTime = 0;
    await audio.play();

    return audio;
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className={styles.root}>
      <div>
        {voiceList.map(({ src, text }) => {
          return <audio key={src} src={src} id={`audio-${text}`} />;
        })}
      </div>
      <dialog
        className={styles.Overlay}
        ref={(node) => {
          if (dialogRef.current === null) {
            node?.showModal();
            dialogRef.current = node;
          }
        }}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={styles.LargeIcon}
          >
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
            <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
          </svg>
        </div>
        <p>
          このサイトでは、ゲームを始めると音声が流れます。
          スピーカーなどの音量にご注意ください。
        </p>
        <button
          type="button"
          className={styles.OverlayButton}
          onClick={async () => {
            const audio = await play("タイトルコール");

            audio.onended = () => {
              dialogRef.current?.close();
            };
          }}
        >
          確認したよ❤
        </button>
        <p className={styles.OverlayCaption}>
          上のボタンを押すと音声が流れます。
        </p>
      </dialog>
      <div>
        <a
          className={styles.ShareButton}
          href={`https://twitter.com/intent/tweet?text=望月のあちゃん（メスガキモード）の数当てゲームでスコア「${serif}」を獲得したよ！&url=https://mochizukinoa.com/guess-number`}
          target="_blank"
          rel="noopener noreferrer"
        >
          結果をXで共有する
        </a>
      </div>
      <div className={styles.Timer}>{time.toFixed(1)}s</div>
      <button
        className={styles.StartButton}
        type="button"
        onClick={() => {
          if (isStarted) {
            setIsStarted(false);
            setTime(0);
            setSerif("もう一回あそぶ？❤");
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
      <div>
        <img
          src="/mesugaki/dummy.webp"
          alt="望月のあ"
          height="200px"
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
                onChange={async () => {
                  if (number === correctNumber) {
                    if (timer.current !== null) {
                      window.clearInterval(timer.current);
                    }
                    setIsStarted(false);
                    if (time < 5) {
                      setSerif("すっご～い❤");
                      await play("すっごーい");
                    } else if (time < 8) {
                      setSerif("がんばれ❤がんばれ❤");
                      await play("がんばれがんばれ");
                    } else if (time < 20) {
                      setSerif("ざぁこ❤");
                      await play("ざあこ");
                    } else {
                      setSerif("なっさけな〜い❤");
                      await play("なっさけない");
                    }
                  } else {
                    if (correctNumber === undefined) {
                      throw new Error("correctNumber is undefined");
                    }
                    if (count > 2) {
                      setSerif("ざぁこ❤ざぁこ❤");
                      await play("ざあこざあこ");
                      setIsStarted(false);
                      if (timer.current !== null) {
                        window.clearInterval(timer.current);
                      }
                    } else if (number < correctNumber) {
                      setSerif("ちっさ❤");
                      await play("ちっさ");
                    } else {
                      setSerif("でっか❤");
                      await play("でっか");
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
