import type { Metadata } from "next";
import Image from "next/image";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { MarryOff } from "./MarryOff";
import styles from "./page.module.css";

const title = "望月のあと結婚する";
const description = "望月のあと結婚したいあなたへ";

export const metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
	},
} satisfies Metadata;

export default function Page() {
	return (
		<div>
			<AppHeader />
			<div className={styles.container}>
				<MarryOff className={styles.score} />
				<div className={styles.download_box}>
					<a
						className={styles.download_button}
						href="/img/marriage-registration.png"
						download
					>
						婚姻届をダウンロード！
					</a>
					<Image
						className={styles.preview}
						src="/img/marriage-registration.png"
						alt="署名入り婚姻届"
						width={3508}
						height={2481}
					/>
				</div>
			</div>
		</div>
	);
}
