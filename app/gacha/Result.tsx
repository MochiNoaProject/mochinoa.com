import React from "react";
import clsx from "clsx";
import data from "../../public/gacha/data.json";
import styles from "./Result.module.css";

export const Result = ({ chara }: { chara?: (typeof data)[number] }) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.frame, chara && styles.frame_active)}>
        {chara ? (
          <React.Fragment>
            <header>
              <h2>{chara.name}</h2>
              <div className={styles.mark}>餅</div>
            </header>
            <div className={styles.rareGroup}>
              {Array.from({ length: chara?.rare }, () => "☆")}
            </div>

            <img
              className={styles.charaImage}
              width={240}
              height={240}
              src={chara.image}
              alt={chara.name}
              decoding="async"
            />
            <p className={styles.note}>{chara.description}</p>
          </React.Fragment>
        ) : (
          <div className={styles.octagram} />
        )}
      </div>
    </div>
  );
};
