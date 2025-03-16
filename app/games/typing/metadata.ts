import { Metadata } from "next";

const metadata: Metadata = {
  title: "もちのあタイピング",
  description:
    "かわいい単語をたくさん入力して、もちのあちゃんに褒めてもらおう！",
  openGraph: {
    title: "もちのあタイピング",
    description:
      "かわいい単語をたくさん入力して、もちのあちゃんに褒めてもらおう！",
    images: [
      {
        url: "/images/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "もちのあタイピング - かわいい単語をたくさん入力しよう！",
      },
    ],
    type: "website",
    siteName: "もちのあ",
  },
  twitter: {
    card: "summary_large_image",
    title: "もちのあタイピング",
    description:
      "かわいい単語をたくさん入力して、もちのあちゃんに褒めてもらおう！",
    images: ["/images/ogp.jpg"],
  },
};

export default metadata;
