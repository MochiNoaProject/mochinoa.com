import { css } from "../styled-system/css";
import Image from "next/image";
import Link, { LinkProps } from "next/link";

const SectionHeading = ({
  children,
  id,
}: React.PropsWithChildren<{ id?: string }>) => {
  return (
    <h2
      id={id}
      className={css({
        fontSize: "32px",
        lineHeight: 1.5,
        marginBottom: "16px",
      })}
    >
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
    <Link
      {...props}
      className={css({
        borderRadius: "24px",
        padding: "8px 16px",
        backgroundColor: variant === "filled" ? "amber.500" : "transparent",
        border: "1px solid transparent",
        borderColor: "amber.500",
        fontSize: "16px",
        lineHeight: 2,
        shadow: "md",
        position: "relative",
      })}
    >
      {children}
    </Link>
  );
};

const Card = (props: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      {...props}
      className={css({
        borderRadius: "24px 96px 24px 24px",
        padding: "24px",
        display: "grid",
        gap: "8px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        transform: "translateZ(0)",
        maxWidth: 720,
        fontSize: "14px",
        lineHeight: 2,
        shadow: "md",
      })}
    />
  );
};

const Background = () => {
  return (
    <div
      className={css({
        position: "relative",
        zIndex: -1,
      })}
    >
      <div
        className={css({
          position: "fixed",
          top: 8,
          right: 8,
          animation: `rumble 1s ease-in-out infinite alternate`,
        })}
      >
        <Image
          src="/img/sign.png"
          alt="望月のあ"
          width={300}
          height={300 / (1302 / 945)}
        />
      </div>
      <div
        className={css({
          position: "fixed",
          zIndex: -1,
          display: "flex",
          width: "100%",
          height: "100dvh",
          objectFit: "cover",
        })}
      >
        <Image
          className={css({
            objectFit: "cover",
          })}
          fill
          src="/img/background.png"
          alt=""
        />
      </div>
      <div
        className={css({
          position: "fixed",
          zIndex: -1,
          display: "flex",
          width: {
            base: "900px",
            md: "1200px",
          },
          height: "auto",
          aspectRatio: "1920/1080",
          bottom: 0,
          right: "-50px",
        })}
      >
        <Image priority fill src="/img/avator.png" alt="望月のあ" />
      </div>
      <div
        className={css({
          position: "fixed",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: -1,
        })}
      >
        <Image
          fill
          loading="lazy"
          className={css({
            objectFit: "cover",
            width: "100%",
            height: "100%",
            scale: 1.3,
            animation: `rumble 4s ease-in-out infinite alternate,
        fadeInOut 30s linear infinite,
        down 30s linear infinite`,
          })}
          src="/img/background-effect.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <Background />

      <main
        className={css({
          color: "white",
          padding: {
            base: "100px 2vw 64px",
            md: "48px 4vw 256px",
          },
          display: "grid",
          gap: "48px",
        })}
      >
        <section>
          <Card>
            <SectionHeading>About 望月のあ</SectionHeading>
            <ul
              className={css({
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBlock: "8px",
              })}
            >
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
                      className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      })}
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

            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "flex-end",
              })}
            >
              <LinkButton href="#contact">
                お仕事、コラボなどのご相談はこちら
              </LinkButton>
            </div>
          </Card>
        </section>
        <section>
          <Card style={{ maxWidth: "none" }}>
            <SectionHeading>今までの活動</SectionHeading>
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 2,
              })}
            >
              {[
                [
                  "かんらくヤ商品提供",
                  "チーズケーキを提供、限定サイン付きでの販売をしていただきました。配信の中で食レポを行い紹介させていただきました。",
                ],

                [
                  "こくちょう菓詩屋商品提供",
                  "ケロケ〜ロカエル缶というクッキー缶を提供いただき、配信の中で食レポを行い紹介させていただきました。",
                ],

                [
                  "肉汁★やバーグ商品提供",
                  "A5ランクの仙台牛を使ったハンバーグを提供いただき、配信の中で食レポを行い紹介させていただきました。",
                ],

                [
                  "北海道えんがるスープカレー商品提供",
                  "北海道えんがる地方のスープカレーを提供いただき、配信の中で食レポを行い紹介させていただきました。",
                ],

                [
                  "エタメデジタルメダル販売",
                  "応援が形あるものとして残りコレクションもできるボイス付きの「VTuberメダル」を制作、販売していただきました。",
                ],

                [
                  "バーチャル物産展月末のご褒美祭り出演",
                  "オンライン空間上に多数の生産者やメーカーが出店し、VTuber・Vライバーが出店ブースの売り子として商品やサービスをアピールするお祭りイベントに出演しました。",
                ],
                [
                  "音楽WEBメディアmuevo voiceにて記事掲載",
                  "「読者の声を形にする」音楽特化のウェブメディアにて「気になるアーティスト」として紹介していただき、歌ってみた動画のレビューを記事にしていただきました。",
                ],
                [
                  "わくわく!VTuberひろばおんらいんvol.26出演",
                  "Akihabara Labが主催している『わくわくVTuberひろばおんらいん』で『わんおんわん』に出演しました。専用のアプリを使用し、ファンの方と1対1でお話をしました。",
                ],
                [
                  "PRIROLLバレンタイン商品ケーキ&マカロンコラボ",
                  "PRIROLLと望月のあのコラボ商品を販売しました。望月のあのキャラクターが印刷されたケーキとマカロンがデザインされ、缶バッジ付きで生産されました。",
                ],
                [
                  "ラヨン漢方医院ダイエット漢方提供",
                  "ラヨン漢方医院よりダイエットをサポートする漢方を提供していただき、1ヶ月間服用して使用感や効果をレビューすることになりました。Twitterやnoteでレビューを書きました。",
                ],
                [
                  "三ヶ日みかんオリジナル段ボールコラボ",
                  "三ヶ日みかんの農家とコラボしました。望月のあのキャラクターがデザインされたオリジナル段ボールに入ったみかんが通販で販売されました。",
                ],
                [
                  "VTuberキャラクターデザイン・Live2D制作",
                  "望月のあのキャラクターをデザインしイラストを描くところからLive2Dの制作までを全て自作で行いました。その他にも、法人・個人のLive2Dの制作を経験しています。",
                ],
              ].map(([title, description]) => {
                return (
                  <Card key={title}>
                    <h3
                      className={css({
                        fontSize: 16,
                      })}
                    >
                      {title}
                    </h3>
                    <p
                      className={css({
                        fontSize: 12,
                      })}
                    >
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
                className={css({
                  textDecoration: "underline wavy currentColor",
                  textDecorationColor: "amber.500",
                })}
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
            <ul
              className={css({
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "8px",
              })}
            >
              {[
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
                      className={css({
                        display: "block",
                        paddingBlock: "8px",
                        paddingInline: "16px",
                        borderRadius: "8px",
                      })}
                    >
                      <h3
                        className={css({
                          fontSize: "18px",
                        })}
                      >
                        {item.title}
                      </h3>
                      <p>{item.description}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      </main>

      <footer
        className={css({
          backgroundColor: "gray.900",
          color: "white",
          padding: "8px",
        })}
      >
        <small
          className={css({
            display: "block",
            textAlign: "right",
            fontSize: "16px",
          })}
        >
          &copy; 2023 もちもちクリエイト
        </small>
      </footer>
    </div>
  );
}
