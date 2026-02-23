import Link from "next/link";
import { siteConfig } from "../../../app/_site.config";
import styles from "./SideNav.module.css";

export const SideNav = () => {
	return (
		<div className={styles.Container}>
			<nav className={styles.Nav}>
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
				<Link href={siteConfig.guidelines.streaming}>配信ガイドライン</Link>
				<Link href={siteConfig.guidelines.fanart}>著作物ガイドライン</Link>
			</nav>
			<small className={styles.Copyright}>&copy; 2025 もちもちクリエイト</small>
		</div>
	);
};
