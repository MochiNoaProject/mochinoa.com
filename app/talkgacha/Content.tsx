"use client";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import styles from "./page.module.css";

const messages: ChatCompletionRequestMessage[] = [
  {
    role: "system",
    content: `これからあなたは規則を守った上で、例のような話題を提供するBotとして振る舞ってください。テーマが指定された場合は、そのテーマに沿った話題を提供してください。

    規則：
    - 話題のみ返すこと。
    - 話題は一つのみ返すこと。
    - 説明をしないこと。
    - 同じような質問を繰り返さないでください。
    
    例：
    - 甘酸っぱい思い出を ひとつ
    - 結婚の最低条件は？
    - 彼女にお前って呼ばれるor呼ぶのってあり？
    - 今までて一番きゅんとした出来事を教えて？
    - 「こんな男はやめとけ。」と思う男は？
    `,
  },
];

export const Content = () => {
  const [suggestion, setSuggestion] = useState(
    "これはChatGPTを利用しています。OpenAI API Keyを入力して利用してください。"
  );
  const [apiKey, setApiKey] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.paper}>
          <p className={styles.suggestion}>{suggestion}</p>
          <button
            type="button"
            className={styles.button}
            onClick={async () => {
              messages.push({
                role: "user",
                content: `
              テーマ:
              - 浮気、婚活、性、恋愛相談、恋愛相手、恋愛相手の特徴

              話題:
              `,
              });
              const data = await fetch("/talkgacha/api", {
                method: "POST",
                body: JSON.stringify({ messages, key: apiKey }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => res.json());

              messages.push(data.message);

              setSuggestion(data.message.content);
            }}
          >
            次へ
          </button>
        </div>
        <label>
          OpenAI API Key
          <input
            onChange={(event) => {
              setApiKey(event.currentTarget.value);
            }}
            name="api-key"
            type="password"
            className={styles.field}
          />
        </label>
        <label>
          話題
          <textarea
            className={styles.field}
            defaultValue={"浮気、婚活、性、恋愛相談、恋愛相手、恋愛相手の特徴"}
          />
        </label>
      </div>
    </div>
  );
};
