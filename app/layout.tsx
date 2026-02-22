import "./global.css";
import "./index.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import { irohamaruMikami } from "../styles/font";
import GoogleAnalytics from "./GoogleAnalytics";
import styles from "./layout.module.css";

const title = "望月のあ公式サイト";
const description =
	"歌とお絵描きが好き!全て自作のVTuber望月のあの公式サイトです。活動実績や各種SNSのリンクなどを掲載しています。今すぐアクセスして魅力的な配信や活躍をチェックしてください!";

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
		images: "https://www.mochinoa.com/img/ogp-2025.jpg",
	},
	openGraph: {
		type: "website",
		title,
		siteName: title,
		url: "https://www.mochinoa.com",
		images: "https://www.mochinoa.com/img/ogp-2025.jpg",
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
		<html lang="ja" className={clsx(irohamaruMikami.className, irohamaruMikami.variable, styles.root)}>
			<head>
				<GoogleAnalytics />
			</head>

			<body>
				{children}
				{modal}
			</body>
		</html>
	);
}
