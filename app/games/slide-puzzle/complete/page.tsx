"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import styles from './page.module.css';

export default function CompletePage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>もちのあスライドパズル | もちのあ</title>
        <meta name="description" content="もちのあのスライドパズルで遊ぼう！シンプルで楽しいパズルゲームです。" />
        
        {/* OGP */}
        <meta property="og:title" content="もちのあスライドパズル | もちのあ" />
        <meta property="og:description" content="もちのあのスライドパズルで遊ぼう！シンプルで楽しいパズルゲームです。" />
        <meta property="og:image" content="https://mochinoa.com/images/puzzle/puzzle1.jpg" />
        <meta property="og:url" content="https://mochinoa.com/games/slide-puzzle" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="もちのあスライドパズル" />
        <meta name="twitter:description" content="もちのあのスライドパズルで遊ぼう！シンプルで楽しいパズルゲームです。" />
        <meta name="twitter:image" content="https://mochinoa.com/images/puzzle/puzzle1.jpg" />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>おめでとうございます！</h1>
          <div className={styles.imageContainer}>
            <img 
              src="/images/puzzle/puzzle1.jpg" 
              alt="完成したパズル" 
              className={styles.completeImage}
            />
          </div>
          <div className={styles.buttons}>
            <Link href="/games/slide-puzzle" className={styles.button}>
              もう一度遊ぶ
            </Link>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('もちのあスライドパズルをクリアしたよ！#もちのあスライドパズル')}&url=${encodeURIComponent('https://mochinoa.com/games/slide-puzzle')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.shareButton}`}
            >
              Xで共有
            </a>
          </div>
        </div>
      </div>
    </>
  );
} 