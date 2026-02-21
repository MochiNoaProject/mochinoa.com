import Image from "next/image";
import Link from "next/link";
import { MusicGallery } from "../features/top/MusicGallery/MusicGallery";
import { siteConfig } from "./_site.config";
import logoImg from "./_assets/images/mochilogo.png";
import topImg from "./_assets/images/トップ画像.png";
import portraitImg from "./_assets/images/momomochi-portrait.jpg";
import peachIconSvg from "./_assets/images/peach-icon.svg";
import styles from "./page.module.css";

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
		<div className={styles.PageContainer}>
			{/* Fixed background: pink + teal sky with scallop wave */}
			<div className={styles.fixedBackground}>
				<div className={styles.skyArea}>
					<div className={styles.wave} />
				</div>
			</div>

			{/* Left fixed area */}
			<div className={styles.FixedLeftArea}>
				<div className={styles.PortraitWrapper}>
					<Image
						src={portraitImg}
						alt="望月のあ"
						width={120}
						height={120}
						className={styles.Portrait}
					/>
					<Image
						src={peachIconSvg}
						alt=""
						width={32}
						height={32}
						className={styles.PeachIcon}
					/>
				</div>
				<span>声優もももち公式サイト</span>
			</div>

			{/* Center scroll area */}
			<div className={styles.CenterScrollArea}>
				{/* Hero */}
				<div className={styles.HeroArea}>
					<Image
						src={logoImg}
						alt="mochi"
						className={styles.Logo}
						priority
					/>
					<Image
						src={topImg}
						alt="望月のあ"
						className={styles.TopImage}
						priority
					/>
					<div className={styles.HeroLinks}>
						<a
							href={siteConfig.links.twitter.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src={siteConfig.links.twitter.image}
								alt="Twitter"
								className={styles.HeroLinkImage}
							/>
						</a>
						<a
							href={siteConfig.links.youtube.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src={siteConfig.links.youtube.image}
								alt="YouTube"
								className={styles.HeroLinkImage}
							/>
						</a>
					</div>
				</div>

				{/* Profile */}
				<div className={styles.ProfileSection}>
					<h2 className={styles.ProfileName}>望月 のあ</h2>
					<p className={styles.ProfileTitle}>コンテンツクリエイター</p>
					<p className={styles.ProfileDescription}>
						誰かのこころに
						<br />
						寄り添える存在になりたい！
						<br />
						猫耳がチャームポイントの、
						<br />
						ちょっぴりおっとりな女の子！
					</p>
				</div>

				{/* Music Gallery */}
				<div className={styles.MusicGallerySection}>
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
								<span className={styles.ProductLabel}>
									{item.name}
								</span>
								<a
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
								>
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
					<p className={styles.ContactTitle}>
						お仕事に関するお問い合わせ
					</p>
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

			{/* Right fixed area */}
			<div className={styles.FixedRightArea}>
				<p>{siteConfig.contact.email}</p>
				<p>Twitter : @_noach</p>
				<Link href={siteConfig.guidelines.streaming}>
					配信ガイドライン
				</Link>
				<Link href={siteConfig.guidelines.fanart}>
					著作物ガイドライン
				</Link>
				<p className={styles.Copyright}>
					&copy; 2025 もちもちクリエイト
				</p>
			</div>
		</div>
	);
}
