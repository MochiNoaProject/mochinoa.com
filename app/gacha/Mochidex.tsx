"use client";
import { useCollection } from "./useCollection";
import { useRef } from "react";
import data from "../../public/gacha/data.json";
import styles from "./Mochidex.module.css";

export const Mochidex = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const collection = useCollection();
  return (
    <div className={styles.container}>
      <dialog ref={dialogRef}>
        <form method="dialog">
          <header>
            <h3>
              図鑑
              <span>（達成率：{(collection.size / data.length) * 100}%）</span>
            </h3>
            <button>閉じる</button>
          </header>
          <article>
            {Array.from({ length: data.length }).map((_, index) => {
              const count = collection.get(index) ?? 0;
              const chara = count ? data[index] : null;
              return (
                <div key={index} className={styles.chara}>
                  <p className={styles.chara_rare}>
                    {chara
                      ? Array.from({ length: chara?.rare }, () => "☆")
                      : "..."}
                  </p>
                  {chara ? (
                    <img
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                      src={chara.image}
                      alt={chara.name}
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.noimage}>？</div>
                  )}
                  <h2 className={styles.chara_name}>
                    {chara?.name ?? "？？？"} x{count}
                  </h2>
                  <p className={styles.chara_description}>
                    {chara?.description ?? "..."}
                  </p>
                </div>
              );
            })}
          </article>
        </form>
      </dialog>
      <button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        図鑑を見る
      </button>
    </div>
  );
};
