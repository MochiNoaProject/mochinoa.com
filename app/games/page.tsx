import React from "react";
import { Cat, Download } from "lucide-react";
import styles from "./page.module.css";
import Image from "next/image";
import clsx from "clsx";

function Page() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <h1 className={styles.appTitle}>
            <Cat size={38} color="white" className={styles.logo} />
            <span className={styles.srOnly}>にゃんとも不思議な同居生活</span>
          </h1>
          <div className={styles.navLinks}>
            <a
              href="#story"
              className={`${styles.navLink} ${styles.hiddenUnderSm}`}
            >
              ストーリー
            </a>
            <a
              href="#character"
              className={`${styles.navLink} ${styles.hiddenUnderSm}`}
            >
              キャラクター
            </a>
            <a href="#download" className={styles.navLink}>
              ダウンロード
            </a>
          </div>
        </nav>
      </header>

      <section className={clsx(styles.hero, styles.nyanEffect)}>
        <Image
          src="/nyantomo/heroImage.jpg"
          alt="hero image"
          fill
          className={styles.heroImage}
        />
      </section>

      <section id="story" className={styles.story}>
        <div className={styles.storyCard}>
          <h2 className={styles.sectionTitle}>あらすじ</h2>
          <div className={styles.storyText}>
            「今日から君の家で暮らすにゃ！」 ある日、大学生の僕は、突然
            猫耳の女の子・望月のあ（もちづき のあ） に押しかけられる。
            彼女は、僕がずっと世話をしていた野良猫
            ルナの&quot;化身&quot;だというのだ。
            「……いや、そんなことあるわけないだろ！」
            「でも、本当にルナにゃ！証拠に——ほら、お魚大好きだし、僕のことだってずっと見てたにゃ！」
            どう見ても普通の女の子。でも、言動や仕草は 完全に猫 だった。
            こうして 「猫だった少女」と「平凡な大学生」
            の不思議な同居生活がスタート！
            「ずっと一緒にいたかったから……。だから、にゃんでもいいから人間になりたかったの……。」
            「好き」って気持ちは、人間でも猫でも変わらない——。
            にぎやかで時々甘酸っぱい、にゃんとも不思議なラブコメ生活、開幕！
          </div>
        </div>
      </section>

      <section
        id="character"
        className={clsx(styles.character, styles.nyanEffect)}
      >
        <div className={styles.characterContainer}>
          <div className={styles.characterImage}>
            <Image
              src="/nyantomo/chara.png"
              width={832}
              height={1216}
              alt="望月のあ"
            />
          </div>
          <div className={styles.characterInfo}>
            <h2>望月 のあ</h2>
            <p>
              元野良猫のルナが人間の姿になった女の子。
              猫らしい仕草や「〜にゃ」という話し方が特徴的。
              主人公のことが大好きで、一緒に暮らせることになって幸せいっぱい。
              魚料理が大好物で、特にマグロには目がない。
            </p>
          </div>
        </div>
      </section>

      <section id="download" className={styles.download}>
        <h2 className={styles.sectionTitle}>ダウンロード</h2>
        <p>ダウンロードは次のボタンから</p>
        <div className={styles.downloadButtons}>
          <a href="#booth" className={styles.downloadButton}>
            <Download />
            BOOTH
          </a>
        </div>
        <div className={styles.downloadInfo}>
          <p>価格: 無料（アプリ内課金なし）</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>©2025 もちもちクリエイト</p>
      </footer>
    </div>
  );
}

export default Page;
