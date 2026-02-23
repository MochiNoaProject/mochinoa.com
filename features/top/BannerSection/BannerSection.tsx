import Image from "next/image";
import { siteConfig } from "../../../app/_site.config";
import { ClipReveal } from "../../../components/ClipReveal/ClipReveal";
import { WavyTitle } from "../../../components/WavyTitle/WavyTitle";
import { TapeDecoration } from "../TapeDecoration/TapeDecoration";
import styles from "./BannerSection.module.css";

export const BannerSection = () => {
	return (
		<>
			{siteConfig.banners.map((banner, i) => (
				<div key={banner.alt} className={styles.BannerItem}>
					<ClipReveal>
						<WavyTitle
							text={banner.label}
							style={{
								color: "var(--color-teal)",
								fontSize: 16,
								textAlign: i % 2 === 0 ? "right" : "left",
							}}
						/>
					</ClipReveal>
					<a
						href={banner.url}
						target="_blank"
						rel="noopener noreferrer"
						style={{ display: "block" }}
					>
						<TapeDecoration
							position={i % 2 === 0 ? "topLeft" : "topRight"}
							color={i % 2 === 0 ? "pink" : "teal"}
						>
							<Image
								src={banner.image}
								alt={banner.alt}
								style={{
									width: "100%",
									height: "auto",
								}}
							/>
						</TapeDecoration>
					</a>
				</div>
			))}
		</>
	);
};
