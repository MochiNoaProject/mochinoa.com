import { Metadata } from "next";

export const metadata: Metadata = {
  title: "もちのあジャンプ",
  description: "かわいいもちのあちゃんがジャンプして障害物を避けるゲーム！",
  openGraph: {
    title: "もちのあジャンプ",
    description: "かわいいもちのあちゃんがジャンプして障害物を避けるゲーム！",
    url: "https://mochinoa.com/games/mochinoa-jump",
    siteName: "もちのあジャンプ",
    images: [
      {
        url: "https://mochinoa.com/images/mochinoa-jump-ogp.png",
        width: 1200,
        height: 630,
        alt: "もちのあジャンプ - かわいいもちのあちゃんのジャンプゲーム",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "もちのあジャンプ",
    description: "かわいいもちのあちゃんがジャンプして障害物を避けるゲーム！",
    images: ["https://mochinoa.com/images/mochinoa-jump-ogp.png"],
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 