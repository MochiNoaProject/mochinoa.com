import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Chibi from "../../components/Chibi";
import data from "../../data/introduction.json";
import links from "../../data/links.json";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
	return (
		<section className={styles.root}>
			<div className={styles.root__inner}>
				<div className={styles.Background__root}>
					<div className={styles.Background__sign}>
						<Image
							src="/img/sign.png"
							alt="望月のあ"
							width={300}
							height={300 / (1302 / 945)}
						/>
					</div>
					<div className={styles.Background__cover}>
						<Image fill src="/img/background.png" alt="" />
					</div>
					<div className={styles.Background__avatar}>
						<Image priority fill src="/img/avator.png" alt="望月のあ" />
					</div>
					<div className={styles.Background__effect}>
						<Image
							fill
							loading="lazy"
							src="/img/background-effect.png"
							alt=""
						/>
					</div>
				</div>
				<div className={styles.Contents}>
					<div className={styles.Card}>
						<h2 className={styles.Title}>About 望月のあ</h2>
						<div className={styles.Card__content}>
							<ul className={styles.SnsList}>
								{links.map((item) => {
									return (
										<li key={item.name}>
											<a
												href={item.url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{item.icon ? (
													<Image
														src={item.icon}
														width={20}
														height={20}
														alt={item.name}
													/>
												) : null}
												{item.name}
											</a>
										</li>
									);
								})}
							</ul>
							{data.description.map((line, i) => {
								return <p key={`description-${i}-${line}`}>{line}</p>;
							})}
						</div>

						<div>
							<Link
								href="#contact"
								className={clsx(styles.CtaButton, styles.ripple)}
								style={{ float: "right" }}
							>
								お仕事のご相談はこちら
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Chibi variant="ピンクショート" position="left" />
		</section>
	);
}
