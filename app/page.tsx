import Image from "next/image";
import Link from "next/link";
import { WavyTitle } from "../components/WavyTitle/WavyTitle";
import { MusicGallery } from "../features/top/MusicGallery/MusicGallery";
import logoImg from "./_assets/images/mochilogo.png";
import portraitImg from "./_assets/images/momomochi-portrait.jpg";
import peachIconSvg from "./_assets/images/peach-icon.svg";
import topImg from "./_assets/images/トップ画像.png";
import { siteConfig } from "./_site.config";
import "./page.global.css";
import tag1Img from "./_assets/images/タグ1.png";
import tag2Img from "./_assets/images/タグ2.png";
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
							className={styles.floatingImage}
							style={{
								borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
								border: "4px solid #fef9d7",
								boxShadow:
									"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px",
							}}
						/>
						<div
							className={styles.floatingBadge}
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
						<p className={styles.LeftColumnLabel}>声優もももち公式サイト</p>
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
						className={styles.swayImage}
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
									className={styles.socialLink}
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
					<div
						style={{
							paddingInline: 24,
							display: "grid",
							gap: 24,
						}}
					>
						<WavyTitle
							text="もちのあちゃんのおみせ"
							style={{
								color: "var(--color-teal)",
								fontSize: 16,
							}}
						/>
						{siteConfig.shop.items.map((item, i) => (
							<div
								key={item.name}
								style={{
									display: "grid",
									paddingInline: 24,
									gridTemplateAreas:
										i % 2 === 0
											? `
									". item item"
									"tag item item"
									"tag . ."
								`
											: `
									"item item ."
									"item item tag"
									". . tag"
								`,
									gridTemplateColumns: "1fr 1fr 1fr",
									gridTemplateRows: "1fr auto auto",
								}}
							>
								<a
									style={{
										gridArea: "item",
										rotate: i % 2 === 0 ? "10deg" : "-10deg",
										display: "flex",
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
									className={styles.tagSway}
									style={{
										gridArea: "tag",
										position: "relative",
										rotate: i % 2 === 0 ? "-10deg" : "10deg",
									}}
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span
										style={{
											position: "absolute",
											bottom: 58,
											left: i % 2 === 0 ? "auto" : 0,
											right: i % 2 === 0 ? 0 : "auto",
											textAlign: "center",
											width: 73,
											fontSize: 12,
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

					{/* Banners */}
					{siteConfig.banners.map((banner, i) => (
						<div
							key={banner.alt}
							style={{
								paddingInline: 24,
								display: "grid",
								gap: 16,
							}}
						>
							<WavyTitle
								text={banner.label}
								style={{
									color: "var(--color-teal)",
									fontSize: 16,
									textAlign: i % 2 === 0 ? "right" : "left",
								}}
							/>
							<a
								href={banner.url}
								target="_blank"
								rel="noopener noreferrer"
								style={{ display: "block" }}
							>
								<Image
									src={banner.image}
									alt={banner.alt}
									style={{
										width: "100%",
										height: "auto",
									}}
								/>
							</a>
						</div>
					))}

					{/* Contact */}
					<div
						style={{
							paddingInline: 24,
							display: "grid",
							gap: 24,
						}}
					>
						<WavyTitle
							text="お仕事に関するお問い合わせ"
							style={{
								fontSize: 16,
								color: "var(--color-teal)",
								textAlign: "right",
							}}
						/>
						<div
							style={{
								fontSize: 14,
								lineHeight: 2,
							}}
						>
							お仕事に関するお問い合わせや コラボのお誘いについては、Xの
							DMまたは下記のメールアドレス までご連絡ください。案件や企
							画などは詳細を最初に共有して いただけるとやり取りがスムー
							ズに進むので助かります。特に 支障がなければ2,3日以内に返信
							させていただきます。
						</div>
						<p
							style={{
								fontSize: 14,
								textAlign: "center",
							}}
						>
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
