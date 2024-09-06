import "./global.css";
import "./index.css";
import { Metadata, Viewport } from "next";
import { ZenKakuGothic } from "../styles/font";
import GoogleAnalytics from "./GoogleAnalytics";
import clsx from "clsx";
import styles from "./layout.module.css";

const title = "望月のあ公式サイト";
const description = `歌とお絵描きが好き!全て自作のVTuber望月のあの公式サイトです。活動実績や各種SNSのリンクなどを掲載しています。今すぐアクセスして魅力的な配信や活躍をチェックしてください!`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://www.mochinoa.com/"),
  twitter: {
    site: "@_noach",
    creator: "@_noach",
    card: "summary_large_image",
    images: "https://www.mochinoa.com/img/ogp.jpg",
  },
  openGraph: {
    type: "website",
    title,
    siteName: title,
    url: "https://www.mochinoa.com",
    images: "https://www.mochinoa.com/img/ogp.jpg",
    description,
  },
} satisfies Metadata;

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ja" className={clsx(ZenKakuGothic.className, styles.root)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400&display=swap"
          rel="stylesheet"
        />
        <GoogleAnalytics />
      </head>

      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
