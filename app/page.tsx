import Image from "next/image";
import Link from "next/link";
import { MusicGallery } from "../features/top/MusicGallery/MusicGallery";
import logoImg from "./_assets/images/mochilogo.png";
import portraitImg from "./_assets/images/momomochi-portrait.jpg";
import peachIconSvg from "./_assets/images/peach-icon.svg";
import topImg from "./_assets/images/トップ画像.png";
import { siteConfig } from "./_site.config";
import "./page.global.css";
import styles from "./page.module.css";

const WAVE_W = 1000;
const WAVE_ARC_DEPTH = 60;
const WAVE_SCALLOP_COUNT = 14;
const WAVE_SCALLOP_FLATNESS = 0.75;

function buildScallopedArcPath() {
	const R =
		(WAVE_W * WAVE_W + 4 * WAVE_ARC_DEPTH * WAVE_ARC_DEPTH) /
		(8 * WAVE_ARC_DEPTH);
	const halfAngle = Math.asin(WAVE_W / (2 * R));

	const points: [number, number][] = [];
	for (let i = 0; i <= WAVE_SCALLOP_COUNT; i++) {
		const theta = -halfAngle + (2 * halfAngle * i) / WAVE_SCALLOP_COUNT;
		points.push([
			WAVE_W / 2 + R * Math.sin(theta),
			WAVE_ARC_DEPTH - R * (1 - Math.cos(theta)),
		]);
	}

	let d = `M 0 0 L ${WAVE_W} 0`;
	let maxY = 0;

	for (let i = WAVE_SCALLOP_COUNT; i > 0; i--) {
		const [px, py] = points[i];
		const [tx, ty] = points[i - 1];
		const dx = tx - px;
		const dy = ty - py;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const r = dist * WAVE_SCALLOP_FLATNESS;
		const bulge = r - Math.sqrt(r * r - (dist / 2) ** 2);
		const midY = (py + ty) / 2 + bulge;
		if (midY > maxY) maxY = midY;
		d += ` A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${tx.toFixed(2)} ${ty.toFixed(2)}`;
	}

	d += " Z";
	return { d, height: Math.ceil(maxY) - 2 };
}

const wavePath = buildScallopedArcPath();

const divider = (
	<div className={styles.Divider}>
		<div className={styles.DividerDot} />
		<div className={styles.DividerDot} />
		<div className={styles.DividerDot} />
		<div className={styles.DividerDot} />
		<div className={styles.DividerDot} />
	</div>
);

export default function Page() {
	return (
		<div className={styles.Root}>
			{/* Fixed background: pink + teal sky with scallop wave */}
			<div className={styles.fixedBackground}>
				<div className={styles.skyArea}>
					<svg
						className={styles.wave}
						aria-label="wave"
						viewBox={`0 0 ${WAVE_W} ${wavePath.height}`}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d={wavePath.d} fill="#63bac7" />
					</svg>
				</div>
			</div>

			<div className={styles.MainContent}>
				<div className={styles.LeftColumn}>
					<a
						style={{
							display: "grid",
							gap: 16,
						}}
						href={siteConfig.links.momomochi}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div
							style={{
								position: "relative",
							}}
						>
							<Image
								src={portraitImg}
								alt="望月のあ"
								width={200}
								height={200}
								style={{
									borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
									border: "4px solid #fef9d7",
									boxShadow:
										"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px",
								}}
							/>
							<div
								style={{
									position: "absolute",
									backgroundColor: "white",
									borderRadius: "50%",
									padding: 4,
									display: "grid",
									top: 0,
									right: 0,
									boxShadow:
										"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px",
								}}
							>
								<Image src={peachIconSvg} alt="" width={30} height={30} />
							</div>
							<div
								style={{
									color: "rgb(139, 195, 74)",
									backgroundColor: "white",
									position: "absolute",
									bottom: 16,
									left: 0,
									fontWeight: "bold",
									lineHeight: 1,
									fontSize: 10,
									padding: "8px 4px",
									borderRadius: 4,
									rotate: "-10deg",
									boxShadow:
										"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px",
								}}
							>
								Healing Voice!
							</div>
						</div>
						<p className={styles.LeftColumnLabel}>
							声優もももち公式サイト
						</p>
					</a>
				</div>
				<div className={styles.CenterColumn}>
					{/* Hero */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 16,
							paddingTop: 16,
						}}
					>
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
						/>
						<div
							style={{
								display: "flex",
								gap: 32,
								alignItems: "center",
							}}
						>
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
								>
									<Image
										src={link.image}
										alt={link.alt}
										width={42}
										height={42}
									/>
								</a>
							))}
						</div>
					</div>

					{/* Profile */}
					<div>
						<div
							style={{
								paddingBlock: 16,
								marginInline: 32,
								borderTop: `4px dotted var(--color-teal)`,
								borderBottom: `4px dotted var(--color-teal)`,
								textAlign: "center",
								color: `var(--color-teal)`,
								display: "grid",
								gap: 16,
							}}
						>
							<div
								style={{
									lineHeight: 1.6,
								}}
							>
								<h2>望月 のあ</h2>
								<p>コンテンツクリエイター</p>
							</div>
							<p
								style={{
									lineHeight: 1.6,
								}}
							>
								誰かのこころに
								<br />
								寄り添える存在になりたい！
								<br />
								猫耳がチャームポイントの、
								<br />
								ちょっぴりおっとりな女の子！
							</p>
						</div>
					</div>

					{/* Music Gallery */}
					<div
						style={{
							paddingBlock: 40,
						}}
					>
						<MusicGallery songs={siteConfig.songs} />
					</div>

					{/* Shop */}
					<div className={styles.ShopSection}>
						<p className={styles.ShopTitle}>もちのあちゃんのおみせ</p>
						{siteConfig.shop.items.map((item, i) => (
							<div key={item.name} className={styles.ProductCard}>
								<div className={styles.ProductImageWrapper}>
									<div className={styles.TapeTopLeft} />
									<Image
										src={item.image}
										alt={item.name}
										className={styles.ProductImage}
									/>
									{i === 0 ? (
										<div className={styles.TapeBottomRight} />
									) : (
										<div className={styles.TapeTopRight} />
									)}
								</div>
								<div className={styles.ProductInfo}>
									<span className={styles.ProductLabel}>{item.name}</span>
									<a href={item.url} target="_blank" rel="noopener noreferrer">
										<Image
											src={item.tag}
											alt="詳細はこちら"
											className={styles.ProductTag}
										/>
									</a>
								</div>
							</div>
						))}
					</div>

					{divider}

					{/* Banners */}
					{siteConfig.banners.map((banner) => (
						<a
							key={banner.alt}
							href={banner.url}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.BannerCard}
						>
							<div className={styles.BannerTapeLeft} />
							<Image
								src={banner.image}
								alt={banner.alt}
								className={styles.BannerImage}
							/>
							<div className={styles.BannerTapeRight} />
						</a>
					))}

					{divider}

					{/* Contact */}
					<div className={styles.ContactSection}>
						<p className={styles.ContactTitle}>お仕事に関するお問い合わせ</p>
						<p className={styles.ContactBody}>
							お仕事に関するお問い合わせや
							<br />
							コラボのお誘いについては、Xの
							<br />
							DMまたは下記のメールアドレス
							<br />
							までご連絡ください。案件や企
							<br />
							画などは詳細を最初に共有して
							<br />
							いただけるとやり取りがスムー
							<br />
							ズに進むので助かります。特に
							<br />
							支障がなければ2,3日以内に返信
							<br />
							させていただきます。
						</p>
						<p className={styles.ContactEmail}>
							連絡先： {siteConfig.contact.email}
						</p>
					</div>
				</div>
				<div className={styles.RightColumn}>
					<div
						style={{
							display: "grid",
							gap: 32,
						}}
					>
						<nav
							style={{
								display: "grid",
								alignItems: "center",
								gap: 8,
								fontSize: 16,
							}}
						>
							<a href={`mailto:${siteConfig.contact.email}`}>
								{siteConfig.contact.email}
							</a>
							<a
								href={siteConfig.links.twitter.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Twitter : @_noach
							</a>
							<Link href={siteConfig.guidelines.streaming}>
								配信ガイドライン
							</Link>
							<Link href={siteConfig.guidelines.fanart}>
								著作物ガイドライン
							</Link>
						</nav>
						<small
							style={{
								fontSize: 16,
							}}
						>
							&copy; 2025 もちもちクリエイト
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
