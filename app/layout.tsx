import "./global.css";
import "./index.css";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
// Removed ZenKakuGothic import
import GoogleAnalytics from "./GoogleAnalytics";
import styles from "./layout.module.css";

const baseTitle = "Mochinoa's VTuber Hub"; // Updated site title
const title = `${baseTitle} | Official Site`;
const description =
	"歌とお絵描きが好き!全て自作のVTuber望月のあの公式サイトです。活動実績や各種SNSのリンクなどを掲載しています。今すぐアクセスして魅力的な配信や活躍をチェックしてください!";

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export const metadata = {
	title: {
		default: baseTitle, // Use base title for default
		template: `%s | ${baseTitle}`, // Use base title in template
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
		title: baseTitle, // Use base title for OpenGraph
		siteName: baseTitle, // Use base title for OpenGraph siteName
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
		// Removed ZenKakuGothic.className from html tag
		<html lang="ja" className={clsx(styles.root)}>
			<head>
				{/* Removed manual Google Font links for Zen Maru Gothic,
				    Roboto and Poppins are now imported in global.css */}
				<GoogleAnalytics />
			</head>

			<body>
				{children}
				{modal}
			</body>
		</html>
	);
}
