import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import nikukyu from "./_assets/nikukyu.png"
import youtubeIcon from "./_assets/youtube-icon.png";
import twitterIcon from "./_assets/twitter-icon.png";
import activityThumbnail01 from "./_assets/activities/001.jpg"
import activityThumbnail02 from "./_assets/activities/002.jpg"
import activityThumbnail03 from "./_assets/activities/003.jpg"
import { siteConfig } from "./_site.config";
import gachaThumbnail from "./_assets/apps/gacha.png";
import kazuateThumbnail from "./_assets/apps/kazuate.png";
import kekkonThumbnail from "./_assets/apps/kekkon.png";
import kokoroThumbnail from "./_assets/apps/kokoro.png";
import nyantomoThumbnail from "./_assets/apps/nyantomo.png";
import puzzleThumbnail from "./_assets/apps/puzzle.png";
import typingThumbnail from "./_assets/apps/typing.png";
import voiceThumbnail from "./_assets/apps/voice.png";
import { AppHeader } from "./AppHeader";

const HeroSection = () => {
	return (
			<div className={styles.HeroSection}>
				<div>
					<video className={styles.HeroMovie} src="/hero-movie.mp4" autoPlay loop muted playsInline />
				</div>
				<div className={styles.HeroMessage}>
					<p className={styles.Title}>
						Welcome to Mochinoa's World
					</p>
					<p>
						誰かのこころに寄り添える存在になりたい！<br />
						猫耳がチャームポイントの、ちょっぴりおっとりな女の子！
					</p>
				</div>
			</div>
	)
}

const AboutSection = () => {
	return (
		<section className={styles.SectionCommon}>
			<h2>About Mochizuki Noa</h2>
			<p>
				満月みたいに、あなたの夜をやさしく照らせますように。
			</p>
			<p>
				声優、イラストレーター、Live2Dデザイナー、ゲームクリエイターなど、マルチに活動しています。
			</p>
		</section>
	)
}

const LatestActivities = () => {
	return (
		<section className={styles.SectionCommon}>
			<h2>Latest Activities</h2>
			<ul className={styles.Gallery}>
				{[
					{
						title: "ワンマンイベント開催",
						description: "オンラインのワンマンとーくイベントを開催。ファンのみんなとお話したり、企画やオリジナルグッズのガチャを実施。",
						thumbnail: activityThumbnail01,
					},
					{
						title: "marurucafe コラボカフェ実施",
						description: "marurucafeさんにてコラボカフェの実施し、コラボメニューの販売やトークイベントへの出演をしました。",
						thumbnail: activityThumbnail02,
					},
					{
						title: "推しカード販売",
						description: "スマホをかざすと情報が表示される新しい推しを布教できるNFCカード、推しカードを販売しました。",
						thumbnail: activityThumbnail03,	
					}
				].map(item => {
					return (
						<li key={item.title}>
							<Image src={item.thumbnail} alt={item.title} width={200} height={150} />
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</li>
					)
				})}
			</ul>
		</section>
	)
}

const ContactSection = () => {
	return (
		<section className={styles.SectionCommon}>
			<h2>Contact</h2>
			<p>
				お仕事に関するお問い合わせやコラボのお誘いについては、XのDMまたは下記のメールアドレスまでご連絡ください。案件や企画などは詳細を最初に共有していただけるとやり取りがスムーズに進むので助かります。特に支障がなければ2,3日以内に返信させていただきます。
			</p>
			<p>
				連絡先：<a href="mailto:mochizuki.noa.project@gmail.com">mochizuki.noa.project@gmail.com</a>
			</p>
		</section>
	)
}

const GamesAppsSection = () => {
	return (
		<section className={styles.SectionCommon}>
			<h2>Games & Apps</h2>
			
			<div className={styles.GameGallery}>
							{
				[
					{
						title: "にゃんとも不思議な同居生活",
						thumbnail: nyantomoThumbnail,
						link: "/games/nyantomo"
					},
					{
						title: "数当てゲーム",
						thumbnail: kazuateThumbnail,
						link: "/guess-number"
					},
					{
						title: "結婚アプリ",
						thumbnail: kekkonThumbnail,
						link: "/marry",

					},
					{
						title:"のあぼいす",
						thumbnail: voiceThumbnail,
						link: "https://noavoice.vercel.app/"
					},
					{
						title: "ガチャアプリ",
						thumbnail: gachaThumbnail,
						link: "/gacha"	
					},
					{
						title: "スライドパズル",
						thumbnail: puzzleThumbnail,
						link: "/games/slide-puzzle"
					},
					{
						title: "タイピング",
						thumbnail: typingThumbnail,
						link: "/games/typing"
					},
					{
						title: "心の形診断",
						thumbnail: kokoroThumbnail,
						link: "https://kokoro-shindan.mochinoa.com/"
					}
				].map(item => {
					return (
						<Link className={styles.Item} href={item.link} key={item.title}>
							<Image src={item.thumbnail} alt={item.title} width={200} height={200} />
							<h3 className={styles.Title}>{item.title}</h3>
						</Link>
					)

				})
			}
			</div>
		</section>
	)
}

export default function Page() {
	return (
		<div>
			<AppHeader/>
			<HeroSection/>
			<AboutSection/>
			<LatestActivities/>
			<ContactSection/>
			<GamesAppsSection/>
			<footer className={styles.Footer}>

				<nav className={styles.FooterSocial}>
					<Link className={styles.LinkButton}  href={siteConfig.twitter.url} target="_blank" rel="noopener noreferrer">
						<Image src={twitterIcon} alt="Twitter" width={twitterIcon.width} height={twitterIcon.height} />
					</Link>
					<Link className={styles.LinkButton} href={siteConfig.youtube.url} target="_blank" rel="noopener noreferrer">
						<Image src={youtubeIcon} alt="YouTube" width={youtubeIcon.width} height={youtubeIcon.height} />
					</Link>
				</nav>
				<nav className={styles.FooterNav}>
					<Link href="/guidelines/streaming">配信ガイドライン</Link>
					/
					<Link href="/guidelines/fanart">
						ファンアート・著作物ガイドライン
					</Link>
				</nav>
				<small className={styles.Copyright}>
					&copy; 2025 もちもちクリエイト
				</small>
			</footer>
		</div>
	);
}
