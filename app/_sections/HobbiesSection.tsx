import Link from "next/link";
import Chibi from "../../components/Chibi";
import styles from "./HobbiesSection.module.css";

export default function HobbiesSection() {
	return (
		<section className={styles.root} id="app">
			<h2 className={styles.Title}>アプリ</h2>
			<ul className={styles.HobbyList}>
				{[
import clsx from "clsx";

// Define an array of hobby items with titles, descriptions, and hrefs
// The color/background will now be handled by CSS classes
const hobbyItemsData = [
	{
		href: "/games/nyantomo",
		title: "にゃんとも不思議な同居生活",
		description: "猫耳少女との甘くて不思議な物語をすごそう",
	},
	{
		title: "数当てゲーム",
		description: "望月のあが考えている数を当てよう",
		href: "/guess-number",
	},
	{
		title: "のあぼいす",
		href: "https://noavoice.vercel.app/",
		description: "望月のあの声をたくさん聞こう",
	},
	{
		title: "結婚アプリ",
		description: "望月のあと結婚したいあなたへ",
		href: "/marry",
	},
	{
		title: "ガチャアプリ",
		description: "望月のあ自作キャラクターを集めよう",
		href: "/gacha",
	},
	{
		title: "スライドパズル",
		description: "お手軽に遊べるスライドパズルゲーム",
		href: "/games/slide-puzzle",
	},
	{
		title: "タイピング",
		description: "かわいい単語を入力するゲーム",
		href: "/games/typing",
	},
];

// Define an array of CSS module class names for card backgrounds
const cardBackgroundClasses = [
	styles.cardBg1,
	styles.cardBg2,
	styles.cardBg3,
	// Add more if you have more than 3 distinct styles defined in CSS
];

export default function HobbiesSection() {
	return (
		<section className={styles.root} id="app">
			<h2 className={styles.Title}>アプリ</h2>
			<ul className={styles.HobbyList}>
				{hobbyItemsData.map((item, index) => {
					// Cycle through the background classes
					const backgroundClass = cardBackgroundClasses[index % cardBackgroundClasses.length];
					return (
						<li key={item.title}>
							<Link
								href={item.href}
								className={clsx(styles.HobbyItem, backgroundClass)}
							>
								<h3 className={styles.HobbyItem__title}>{item.title}</h3>
								<p className={styles.HobbyItem__description}>
									{item.description}
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
			<Chibi variant="緑ショート" position="right" />
		</section>
	);
}
