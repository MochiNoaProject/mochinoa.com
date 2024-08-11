import Image from "next/image";
import Link, { LinkProps } from "next/link";
import activities from "../data/activities.json";
import styles from "./page.module.css";

const SectionHeading = ({
  children,
  id,
}: React.PropsWithChildren<{ id?: string }>) => {
  return (
    <h2 id={id} className={styles.SectionHeading}>
      {children}
    </h2>
  );
};

type LinkButtonProps = LinkProps &
  React.ComponentPropsWithoutRef<"a"> & {
    variant?: "filled" | "outlined";
  };

const LinkButton = ({
  children,
  variant = "filled",
  ...props
}: LinkButtonProps) => {
  return (
    <Link {...props} data-variant={variant} className={styles.LinkButton}>
      {children}
    </Link>
  );
};

const Card = (props: React.ComponentPropsWithoutRef<"div">) => {
  return <div {...props} className={styles.Card} />;
};

const Background = () => {
  return (
    <div className={styles.Background__root}>
      <div className={styles.Background__sign}>
        <Image
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
  );
};

export default function Page() {
  return (
    <div>
      <Background />

      <main className={styles.main}>
        <section>
          <Card>
            <SectionHeading>About 望月のあ</SectionHeading>
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
                  name: "pixivFANBOX",
                  url: "https://mochizukinoa.fanbox.cc/",
                  icon: "/img/icon_pixiv.png",
                },
                {
                  name: "BOOTH",
                  url: "https://mochinoa.booth.pm/",
                  icon: "/img/icon_booth.png",
                },
              ].map((item) => {
                return (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
              <LinkButton href="#contact" style={{ float: "right" }}>
                お仕事、コラボなどのご相談はこちら
              </LinkButton>
            </div>
          </Card>
        </section>
        <section>
          <Card style={{ maxWidth: "none" }}>
            <SectionHeading>今までの活動</SectionHeading>
            <div className={styles.ActivityList}>
              {activities.map(({ title, description }) => {
                return (
                  <Card key={title}>
                    <h3 className={styles.ActivityItem__title}>{title}</h3>
                    <p className={styles.ActivityList__description}>
                      {description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </Card>
        </section>

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
                  title: "結婚アプリ",
                  description: "望月のあと結婚したいあなたへ",
                  href: "/marry",
                  color: "#EE9B44",
                },
                {
                  title: "数当てゲーム",
                  description: "望月のあが考えている数を当てよう",
                  href: "/guess-number",
                  color: "#ee6644",
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
      </main>

      <footer className={styles.Footer}>
        <small className={styles.Footer__copyright}>
          &copy; 2023 もちもちクリエイト
        </small>
      </footer>
    </div>
  );
}
