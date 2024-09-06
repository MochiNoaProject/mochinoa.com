import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.root}>
      <div className={styles.Background__root}>
        <div>
          <Image
            className={styles.Background__sign}
            src="/img/sign.png"
            alt="望月のあ"
            width={300}
            height={300 / (1302 / 945)}
          />
        </div>
        <div className={styles.Background__cover}>
          <Image fill src="/img/background.png" alt="" />
        </div>
        <div className={styles.Background__avatar}>
          <Image priority fill src="/img/avator.png" alt="望月のあ" />
        </div>
        <div className={styles.Background__effect}>
          <Image fill loading="lazy" src="/img/background-effect.png" alt="" />
        </div>
      </div>
      <div className={styles.Contents}>
        <div className={styles.Card}>
          <h2 className={styles.Title}>About 望月のあ</h2>
          <ul className={styles.SnsList}>
            {[
              {
                name: "YouTube",
                url: "https://www.youtube.com/@MochizukiNoa",
                icon: "/img/icon_youtube.png",
              },
              {
                name: "Twitter",
                url: "https://twitter.com/_noach",
                icon: "/img/icon_twitter.png",
              },
              {
                name: "BOOTH",
                url: "https://mochinoa.booth.pm/",
                icon: "/img/icon_booth.png",
              },
            ].map((item) => {
              return (
                <li key={item.name}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        width={20}
                        height={20}
                        alt={item.name}
                      />
                    ) : null}
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <p>
            歌とお絵描きが好きなVTuber!得意のお絵描きとLive2Dのちからで自分自身を錬成し、全て自作で活動中!
          </p>
          <p>
            これまでに受けたお仕事を実績としてまとめているので、望月のあに依頼したい案件などありましたらご相談ください!食べ物のPR系や歌唱依頼、リアルイベント、その他わくわくするお仕事をたくさんできると嬉しいです！
          </p>

          <div>
            <Link
              href="#contact"
              className={clsx(styles.CtaButton, styles.ripple)}
              style={{ float: "right" }}
            >
              お仕事のご相談はこちら
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
