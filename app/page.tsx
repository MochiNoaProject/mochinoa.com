import ActivitiesSection from "./_sections/ActivitiesSection";
import HeroSection from "./_sections/HeroSection";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <HeroSection />

      <ActivitiesSection />

      {/*
        <section id="contact">
          <Card>
            <SectionHeading>お仕事の依頼、コラボなどのご相談</SectionHeading>
            <p>
              <a
                href="https://twitter.com/_noach"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.TwitterLink}
              >
                TwitterのDM
              </a>
              までよろしくお願いします。
            </p>
            <p>
              案件や企画などは詳細を最初に共有させていただけると助かります。
              特に支障がなければ、2,3日以内に返信させていただきます。
            </p>
            <p>
              Twitterをご利用でない場合や、メールでのご相談を希望される場合は、以下のメールアドレスにご連絡ください。
            </p>
            <p>連絡先 : mochizuki.noa.project@gmail.com</p>
          </Card>
        </section>
        <section>
          <Card>
            <SectionHeading>おもちゃ</SectionHeading>
            <ul className={styles.HobbyList}>
              {[
                {
                  title: "数当てゲーム",
                  description: "望月のあが考えている数を当てよう",
                  href: "/guess-number",
                  color: "#ee6644",
                },
                {
                  title: "のあぼいす",
                  href: "https://noavoice.vercel.app/",
                  description: "望月のあの声をたくさん聞こう",
                  color: "#44b8ee",
                },
                {
                  title: "結婚アプリ",
                  description: "望月のあと結婚したいあなたへ",
                  href: "/marry",
                  color: "#EE9B44",
                },
                {
                  title: "ガチャアプリ",
                  description: "望月のあ自作キャラクターを集めよう",
                  href: "/gacha",
                  color: "#FFC200",
                },
                {
                  title: "合成音声アプリ",
                  description: "誰でも望月のあの声になれる",
                  href: "https://huggingface.co/spaces/hrdtbs/rvc-mochinoa",
                  color: "#5b44ee",
                },
              ].map((item) => {
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      style={{
                        backgroundColor: item.color,
                      }}
                      className={styles.HobbyItem}
                    >
                      <h3 className={styles.HobbyItem__title}>{item.title}</h3>
                      <p>{item.description}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
 */}
      <footer className={styles.Footer}>
        <small className={styles.Footer__copyright}>
          &copy; 2023 もちもちクリエイト
        </small>
      </footer>
    </main>
  );
}
