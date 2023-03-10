import "./index.css";
import "./ress.css";
import { Metadata } from "next";
import GoogleAnalytics from "./GoogleAnalytics";

const title = "望月のあ公式サイト";
const description = `歌とお絵描きが好き!全て自作のVTuber望月のあの公式サイトです。活動実績や各種SNSのリンクなどを掲載しています。今すぐアクセスして魅力的な配信や活躍をチェックしてください!`;

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  icons: {
    icon: "/favicon.png",
  },
  viewport: "width=device-width, initial-scale=1.0",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
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

      <body>{children}</body>
    </html>
  );
}
