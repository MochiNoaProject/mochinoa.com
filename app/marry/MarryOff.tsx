"use client";

import { useEffect, useRef, useState } from "react";

export const MarryOff = ({ className }: { className?: string }) => {
  const [score, setScore] = useState(0);
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) {
      return;
    }
    const start = new Date().getTime();
    fired.current = true;

    let flag = true;
    while (flag) {
      const ok = window.confirm("望月のあと結婚したいですか？");
      if (ok) {
        window.alert("いい子");
        flag = false;
        const end = new Date().getTime();
        setScore((end - start) / 1000);
      } else {
        window.alert("は？");
      }
    }
  }, []);
  return (
    <div className={className}>
      <p>あなたが結婚に同意するまで、{score}秒かかりました。</p>
      <p>
        {score > 0
          ? score > 3
            ? "なんですぐに答えられないのかな。"
            : score > 1
            ? "もう少し頑張りましょう。"
            : "まあ合格やな。"
          : "..."}
      </p>
    </div>
  );
};
