import Image from "next/image";
import Link from "next/link";
import nikukyu from "./_assets/nikukyu.png";
import twitterIcon from "./_assets/twitter-icon.png";
import youtubeIcon from "./_assets/youtube-icon.png";
import { siteConfig } from "./_site.config";
import styles from "./AppHeader.module.css";

export const AppHeader = () => {
	return (
		<header className={styles.AppHeader}>
			<h1>
				<Link href="/" className={styles.Title}>
					<Image src={nikukyu} alt="肉球のマーク" width={16} height={14} />
					Mochinoa's Official Site
				</Link>
			</h1>
			<nav className={styles.Menu}>
				<ul>
					<li>
						<Link href="/#about">About</Link>
					</li>
					<li>
						<Link href="/#works">Works</Link>
					</li>
					<li>
						<Link href="/#contact">Contact</Link>
					</li>
				</ul>
				<div className={styles.Socials}>
					<Link
						className={styles.LinkButton}
						href={siteConfig.links.twitter.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={twitterIcon}
							alt="Twitter"
							width={twitterIcon.width}
							height={twitterIcon.height}
						/>
					</Link>
					<Link
						className={styles.LinkButton}
						href={siteConfig.links.youtube.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={youtubeIcon}
							alt="YouTube"
							width={youtubeIcon.width}
							height={youtubeIcon.height}
						/>
					</Link>
				</div>
			</nav>
		</header>
	);
};
