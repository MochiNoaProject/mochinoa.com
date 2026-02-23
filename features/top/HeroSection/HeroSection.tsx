import Image from "next/image";
import logoImg from "../../../app/_assets/images/mochilogo.png";
import topImg from "../../../app/_assets/images/トップ画像.png";
import { siteConfig } from "../../../app/_site.config";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
	return (
		<div className={styles.HeroSection}>
			<Image
				src={logoImg}
				alt="mochi"
				width={120}
				height={(logoImg.height / logoImg.width) * 120}
				priority
			/>
			<Image
				src={topImg}
				alt="望月のあ"
				width={300}
				height={(topImg.height / topImg.width) * 300}
				priority
				className={styles.swayImage}
			/>
			<div className={styles.SocialLinks}>
				{[
					{
						url: siteConfig.links.youtube.url,
						image: siteConfig.links.youtube.image,
						alt: "YouTube",
					},
					{
						url: siteConfig.links.twitter.url,
						image: siteConfig.links.twitter.image,
						alt: "Twitter",
					},
				].map((link) => (
					<a
						key={link.url}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.socialLink}
					>
						<Image src={link.image} alt={link.alt} width={42} height={42} />
					</a>
				))}
			</div>
		</div>
	);
};
