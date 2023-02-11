import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <div className={styles.background}>
        <Image fill src="/img/background.png" alt="" />
      </div>
      <div className={styles.avator}>
        <Image priority fill src="/img/avator.png" alt="望月のあ" />
      </div>
      <div className={styles.effect_container}>
        <Image
          fill
          loading="lazy"
          className={styles.effect}
          src="/img/background-effect.png"
          alt=""
        />
      </div>
      <header className={styles.header}>
        <Image
          priority
          width={146}
          height={(146 / 400) * 155}
          src="/img/logo.png"
          alt="望月のあ Official Site"
        />
        <a href="#contact">CONTACT</a>
      </header>
      <div
        style={{
          height: "70vh",
        }}
      />
      <main className={styles.main}>
        <section className={styles.section_achievements}>
          <h2>Achievements</h2>
          <ul className={styles.list}>
            {[
              {
                title: "わくわく!VTuberひろばおんらいんvol.26出演",
                description:
                  "Akihabara Labが主催している『わくわくVTuberひろばおんらいん』で『わんおんわん』に出演しました。専用のアプリを使用し、ファンの方と1対1でお話をしました。",
              },
              {
                title: "PRIROLLバレンタイン商品ケーキ&マカロンコラボ",
                description:
                  "PRIROLLと望月のあのコラボ商品を販売しました。望月のあのキャラクターが印刷されたケーキとマカロンがデザインされ、缶バッジ付きで生産されました。",
              },
              {
                title: "ラヨン漢方医院ダイエット漢方提供",
                description:
                  "ラヨン漢方医院よりダイエットをサポートする漢方を提供していただき、1ヶ月間服用して使用感や効果をレビューすることになりました。Twitterやnoteでレビューを書きました。",
              },
              {
                title: "三ヶ日みかんオリジナル段ボールコラボ",
                description:
                  "三ヶ日みかんの農家とコラボしました。望月のあのキャラクターがデザインされたオリジナル段ボールに入ったみかんが通販で販売されました。",
              },
              {
                title: "VTuberキャラクターデザイン・Live2D制作",
                description:
                  "望月のあのキャラクターをデザインしイラストを描くところからLive2Dの制作までを全て自作で行いました。その他にも、法人・個人のLive2Dの制作を経験しています。",
              },
            ].map((item) => {
              return (
                <li key={item.title} className={styles.card_black}>
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className={styles.section_links}>
          <h2>Links</h2>
          <ul className={styles.list}>
            {[
              {
                name: "YouTube",
                url: "https://www.youtube.com/@MochizukiNoa",
                src: "/img/links_youtube.png",
              },
              {
                name: "Fanbox",
                url: "https://mochizukinoa.fanbox.cc/",
                src: "/img/links_fanbox.png",
              },
              {
                name: "Twitter",
                url: "https://twitter.com/_noach",
                src: "/img/links_twitter.png",
              },
              {
                name: "Booth",
                url: "https://mochinoa.booth.pm/",
                src: "/img/links_booth.png",
              },
            ].map((item) => {
              return (
                <li key={item.name}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      width={300}
                      height={(300 / 1000) * 395}
                      loading="lazy"
                      src={item.src}
                      alt={item.name}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h2 id="contact">Contact</h2>
          <div className={styles.card_black}>
            <h3>お問い合わせ方法</h3>
            <p>
              お仕事の依頼、コラボなどのご相談は
              <a
                href="https://twitter.com/_noach"
                target="_blank"
                rel="noopener noreferrer"
              >
                TwitterのDM
              </a>
              までよろしくお願いします。
            </p>
            <p>
              案件や企画などは詳細を最初に共有させていただけると助かります。
              特に支障がなければ、2,3日以内に返信させていただきます。
            </p>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <small>&copy; 2023 もちもちクリエイト</small>
      </footer>
    </div>
  );
}
