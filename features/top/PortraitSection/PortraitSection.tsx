import Image from "next/image";
import portraitImg from "../../../app/_assets/images/momomochi-portrait.jpg";
import peachIconSvg from "../../../app/_assets/images/peach-icon.svg";
import { siteConfig } from "../../../app/_site.config";
import styles from "./PortraitSection.module.css";

export const PortraitSection = () => {
	return (
		<div className={styles.Container}>
			<a
				className={styles.BrandLink}
				href={siteConfig.links.momomochi}
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className={styles.ImageContainer}>
					<Image
						src={portraitImg}
						alt="望月のあ"
						style={{ width: 200, height: "auto" }}
						sizes="200px"
						className={styles.floatingImage}
					/>
					<div className={styles.floatingBadge}>
						<Image
							src={peachIconSvg}
							alt=""
							style={{ width: 30, height: "auto" }}
							sizes="30px"
						/>
					</div>
					<div className={styles.Label}>Healing Voice!</div>
				</div>
				<p className={styles.LeftColumnLabel}>声優もももち公式サイト</p>
			</a>
			<a
				className={styles.FantiaLink}
				href={siteConfig.links.fantia.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					src={siteConfig.links.fantia.image}
					alt="Fantia"
					width={200}
					height={40}
				/>
			</a>
		</div>
	);
};
