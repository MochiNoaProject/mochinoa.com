"use client";

import styles from "./page.module.css";

export default function FanartGuidelines() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎨 ファンアート・著作物ガイドライン 🎨</h1>
      
      <section className={styles.section}>
        <p className={styles.text}>
          いつもあたたかい応援、本当にありがとうございます！
          ファンアートや二次創作を楽しんでいただくために、以下のガイドラインを設けています。
        </p>

        <div className={styles.guidelineSection}>
          <h3 className={styles.guidelineTitle}>✅ OKなこと（非営利に限ります）</h3>
          <ul className={styles.list}>
            <li>ファンアート・イラスト・動画・漫画などの制作＆SNS投稿</li>
            <li>切り抜き動画の編集＆投稿（ガイドラインに従った範囲で）</li>
            <li>のあの活動を応援する目的での創作・シェア</li>
          </ul>
        </div>

        <div className={styles.guidelineSection}>
          <h3 className={styles.guidelineTitle}>🚫 NGなこと</h3>
          <ul className={styles.list}>
            <li>商用利用（グッズ化・有償依頼での使用など）</li>
            <li>自作発言、トレース、無断転載（ファンアート含む）</li>
            <li>公序良俗に反する内容（政治・宗教・過激表現など）</li>
            <li>AI画像を「公式風」または「本人の制作物」として投稿・誤認させる行為</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 