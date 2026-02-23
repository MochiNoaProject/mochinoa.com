import Image from "next/image";
import portraitImg from "../../../app/_assets/images/momomochi-portrait.jpg";
import peachIconSvg from "../../../app/_assets/images/peach-icon.svg";
import { siteConfig } from "../../../app/_site.config";
import styles from "./PortraitSection.module.css";

export const PortraitSection = () => {
	return (
		<a
			className={styles.Container}
			href={siteConfig.links.momomochi}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div className={styles.ImageContainer}>
				<Image
					src={portraitImg}
					alt="望月のあ"
					width={200}
					height={200}
					className={styles.floatingImage}
				/>
				<div className={styles.floatingBadge}>
					<Image src={peachIconSvg} alt="" width={30} height={30} />
				</div>
				<div className={styles.Label}>Healing Voice!</div>
			</div>
			<p className={styles.LeftColumnLabel}>声優もももち公式サイト</p>
		</a>
	);
};
