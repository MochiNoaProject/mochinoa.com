import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "もちのあジャンプ - ゲーム結果",
	description:
		"もちのあジャンプでスコアを獲得しました！あなたもプレイしてみませんか？",
	openGraph: {
		title: "もちのあジャンプ - ゲーム結果",
		description:
			"もちのあジャンプでスコアを獲得しました！あなたもプレイしてみませんか？",
		url: "https://mochinoa.com/games/mochinoa-jump/result",
		siteName: "もちのあジャンプ",
		images: [
			{
				url: "https://mochinoa.com/images/mochinoa-jump-ogp.png",
				width: 1200,
				height: 630,
				alt: "もちのあジャンプ - かわいいもちのあのジャンプゲーム",
			},
		],
		locale: "ja_JP",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "もちのあジャンプ - ゲーム結果",
		description:
			"もちのあジャンプでスコアを獲得しました！あなたもプレイしてみませんか？",
		images: ["https://mochinoa.com/images/mochinoa-jump-ogp.png"],
	},
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return children;
}
