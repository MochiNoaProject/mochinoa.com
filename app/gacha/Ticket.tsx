"use client";

import { useDispatchTicket, useTicket } from "./useCollection";

export const Ticket = () => {
  const ticket = useTicket();
  const dispatchTicket = useDispatchTicket();
  return (
    <div>
      <h2>チケットを手に入れる</h2>
      {ticket.amount}
      <ul>
        {[
          {
            key: "login",
            name: "ログインボーナス",
            url: "https://www.youtube.com/@MochizukiNoa",
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
                  onClick={() => {
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
    </div>
  );
};
