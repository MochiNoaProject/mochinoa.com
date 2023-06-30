import { Metadata } from "next";
import { css } from "../../../styled-system/css";
import Image from "next/image";
import Link from "next/link";

const title = "切り抜きガイドライン｜望月のあ";
const description =
  "望月のあのコンテンツから切り抜き動画を作成する際のガイドラインです。望月のあのコンテンツから切り抜き動画を作成する場合は当ガイドラインへの同意が必要です。";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
} satisfies Metadata;

const Heading1 = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1
      {...props}
      className={css({
        fontSize: "32px",
        marginBlock: "32px",
      })}
    >
      {children}
    </h1>
  );
};

const Heading2 = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h2">) => {
  return (
    <h2
      {...props}
      className={css({
        fontSize: "24px",
        marginBlock: "24px",
        borderBottom: "1px solid #424242",
      })}
    >
      {children}
    </h2>
  );
};

const Heading3 = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h3">) => {
  return (
    <h2
      {...props}
      className={css({
        fontSize: "16px",
        marginBlock: "16px",
        fontWeight: "bold",
      })}
    >
      {children}
    </h2>
  );
};

const List = ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => {
  return (
    <ul
      {...props}
      className={css({
        listStyle: "disc",
        paddingInlineStart: "24px",
      })}
    >
      {children}
    </ul>
  );
};

const Paragraph = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) => {
  return (
    <h2
      {...props}
      className={css({
        fontSize: "16px",
        marginBlock: "16px",
      })}
    >
      {children}
    </h2>
  );
};

export default function Page() {
  return (
    <div>
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
      <header
        className={css({
          position: "sticky",
          top: 0,
          padding: "8px 4vw",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          zIndex: 1200,
          color: "white",
          boxShadow: "var(--shadow-level-2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <Link href="/">
          <Image
            priority
            width={146}
            height={(146 / 400) * 155}
            src="/img/logo.png"
            alt="望月のあ Official Site"
          />
        </Link>
      </header>
      <div>
        <div
          className={css({
            fontFamily: ` system-ui, -apple-system, "Hiragino Sans", "Yu Gothic UI", "Segoe UI", "Meiryo", sans-serif;`,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "var(--shadow-level-2)",
            maxWidth: 740,
            marginInline: "auto",
            marginBlock: "24px",
            marginBlockEnd: "88px",
            paddingBlockEnd: "88px",
            paddingBlockStart: "24px",
            paddingInline: "min(48px, 4vw)",
            borderRadius: "16px",
            color: "#424242",
          })}
        >
          <div
            className={css({
              float: "right",
            })}
          >
            <Paragraph>
              更新日： <time>2023年7月1日</time>
            </Paragraph>
          </div>
          <Heading1>切り抜きガイドライン</Heading1>
          <Paragraph>{description}</Paragraph>

          <Heading2>切り抜きに利用できる素材について</Heading2>

          <Paragraph>
            望月のあが各プラットフォームで全体公開している動画、配信アーカイブ、ショートに加えてYouTubeのコミュニティやTwitterでツイートされた文章コンテンツも利用できます。
          </Paragraph>
          <Heading3>注意事項</Heading3>
          <List>
            <li>
              ライブ配信終了から24時間経過していない配信アーカイブは利用できません。
            </li>
            <li>
              望月のあが著作権その他権利を保有しないコンテンツが含まれる場合は、当該コンテンツ権利者の利用規約に従ってください。
              <List>
                <li>例：歌配信、ゲーム配信など</li>
              </List>
            </li>
            <li>歌配信の切り抜きは、上記項目により原則禁止です。</li>
            <li>
              メンバーシップ限定動画やFANBOX限定配信などの有料コンテンツについては禁止です。
            </li>
            <li>配信中の画面を独自に録画した映像は利用できません。</li>
            <li>
              YouTubeのコミュニティやTwitterで共有された画像や動画は利用できません。
            </li>
          </List>

          <Heading2>動画内容</Heading2>

          <Paragraph>
            配信や動画、ショートなどのコンテンツをほぼそのまま切り抜きにする行為は禁止です。
          </Paragraph>

          <Paragraph>
            元の動画及び配信内容などと大きく異なる印象を与える内容や、誤解を与えるような内容は禁止です。
          </Paragraph>

          <Heading2>概要欄</Heading2>

          <Paragraph>
            切り抜きに利用した動画などのURLを概要欄に必ず記載してください。
          </Paragraph>

          <Heading2>サムネイル及びタイトルについて</Heading2>

          <Paragraph>
            元の動画及び配信内容などと大きく異なる印象を与えるサムネイルや、タイトルの利用を禁止します。
            <br />
            切り抜きと分かるタイトルやサムネイルまたは動画チャンネル名を付けてください。
          </Paragraph>

          <Heading2>収益化について</Heading2>
          <Paragraph>
            各プラットフォームの利用規約及び当ガイドラインに従っていることを前提に、収益化の利用を許諾します。
          </Paragraph>

          <Heading2>切り抜きチャンネル登録</Heading2>

          <Paragraph>登録は必須ではありません。</Paragraph>

          <Paragraph>
            下記フォームから切り抜きチャンネルと連絡先を共有していただいている場合、ガイドラインに違反していると思われる切り抜き動画に対し、こちらで削除手続きをする前に、登録していただいた連絡先に削除連絡を行います。これにより各プラットフォームによるペナルティを回避することが可能になります。
          </Paragraph>

          <Paragraph>
            <a
              className={css({
                color: "#3f51b5",
                textDecoration: "underline",
              })}
              href="https://forms.gle/f8fcqJG6sCzhSrTd8"
            >
              切り抜きチャンネル登録フォーム
            </a>
          </Paragraph>

          <Paragraph>
            しかし、削除依頼に即時同意していただけない場合や1週間経過しても削除が確認できない場合、動画内容によっては登録をしていただいている場合でも、こちらで削除手続きを行う場合があります。
          </Paragraph>

          <Heading2>その他</Heading2>
          <Paragraph>
            このガイドラインについて望月のあに直接確認をされても原則お答えできません。
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
