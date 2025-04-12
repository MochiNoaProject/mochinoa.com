"use client";

import styles from "./page.module.css";

export default function StreamingGuidelines() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌙 望月のあ 配信ガイドライン 🌙</h1>
      
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🐾 リスナーさんへのお願い 🐾</h2>
        <p className={styles.text}>
          みんなで楽しく、あたたかい空間を作っていくために、以下のルールを守ってね！
        </p>
        <ul className={styles.list}>
          <li>配信に関係のない話題を連投しないでください
            <p className={styles.subText}>のあとのおしゃべりタイムを一緒に楽しみましょう🌸</p>
          </li>
          <li>他の人が不快になるようなコメントは禁止です
            <p className={styles.subText}>誹謗中傷、過度な下ネタ、荒らし行為などはブロック・通報の対象になります。</p>
          </li>
          <li>他の配信者さんの名前を話題に出さないようにしましょう
            <p className={styles.subText}>コラボ中など特別な場合を除いて、無関係な話題は控えてね。</p>
          </li>
          <li>ネタバレはやさしく控えめに
            <p className={styles.subText}>一緒にゲームや作品を楽しむために、事前情報や展開の予測はご遠慮ください！</p>
          </li>
          <li>過度な指示・要求コメントはご遠慮ください
            <p className={styles.subText}>応援やアドバイスはうれしいけど、のあが楽しく配信できるように見守ってもらえるとうれしいです。</p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🎨 ファンアート・著作物ガイドライン 🎨</h2>
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