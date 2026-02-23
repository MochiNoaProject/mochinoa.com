import clsx from "clsx";
import Image from "next/image";
import tag1Img from "../../../app/_assets/images/タグ1.png";
import tag2Img from "../../../app/_assets/images/タグ2.png";
import { siteConfig } from "../../../app/_site.config";
import { ClipReveal } from "../../../components/ClipReveal/ClipReveal";
import { WavyTitle } from "../../../components/WavyTitle/WavyTitle";
import styles from "./ShopSection.module.css";

export const ShopSection = () => {
	return (
		<div className={styles.ShopSection}>
			<ClipReveal>
				<WavyTitle
					text="もちのあちゃんのおみせ"
					style={{
						color: "var(--color-teal)",
						fontSize: 16,
					}}
				/>
			</ClipReveal>
			{siteConfig.shop.items.map((item, i) => (
				<div
					key={item.name}
					className={clsx(
						styles.ItemContainer,
						i % 2 === 0 ? styles.ItemContainerLeft : styles.ItemContainerRight,
					)}
				>
					<a
						className={styles.ItemLink}
						style={{
							rotate: i % 2 === 0 ? "10deg" : "-10deg",
							justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
						}}
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={item.image}
							alt={item.name}
							width={200}
							height={(item.image.height / item.image.width) * 200}
						/>
					</a>
					<a
						className={clsx(styles.TagLink, styles.tagSway)}
						style={{
							rotate: i % 2 === 0 ? "-10deg" : "10deg",
						}}
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span
							className={styles.TagName}
							style={{
								left: i % 2 === 0 ? "auto" : 0,
								right: i % 2 === 0 ? 0 : "auto",
							}}
						>
							{item.name}
						</span>
						<Image
							src={i % 2 === 0 ? tag2Img : tag1Img}
							alt="詳細はこちら"
							width={80}
							height={(tag2Img.height / tag2Img.width) * 80}
						/>
					</a>
				</div>
			))}
		</div>
	);
};
