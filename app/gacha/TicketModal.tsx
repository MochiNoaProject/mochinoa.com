"use client";

import { useDispatchTicket, useTicket } from "./useCollection";
import styles from "./TicketModal.module.css";

export const TicketModal = () => {
  const ticket = useTicket();
  const dispatchTicket = useDispatchTicket();
  return (
    <div className={styles.container}>
      <header>
        <h3>
          チケット
          <span>（残り：{ticket.amount}）</span>
        </h3>
        <button>閉じる</button>
      </header>

      <article>
        <ul>
          {[
            {
              key: "login",
              name: "ログインボーナス",
              url: "",
            },
            {
              key: "youtube",
              name: "望月のあ公式YouTubeチャンネルを見る",
              url: "https://www.youtube.com/@MochizukiNoa",
            },
            {
              key: "fanbox",
              name: "望月のあ公式ファンボックスを見る",
              url: "https://mochizukinoa.fanbox.cc/",
            },
            {
              key: "booth",
              name: "望月のあ公式BOOTHを見る",
              url: "https://mochinoa.booth.pm/",
            },
          ].map((item) => {
            const done = dispatchTicket.isIssued(item.key);
            return (
              <li key={item.name}>
                {done ? (
                  <span>{item.name}</span>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (item.url === "") {
                        event.preventDefault();
                      }
                      if (done) return;
                      dispatchTicket.issue(item.key);
                    }}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </article>
    </div>
  );
};
