"use client";

import styles from "./page.module.css";

export default function StreamingGuidelines() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>🌙 望月のあ 配信ガイドライン 🌙</h1>

			<section className={styles.section}>
				<h2 className={styles.sectionTitle}>🐾 リスナーさんへのお願い 🐾</h2>
				<p className={styles.text}>
					みんなで楽しく、あたたかい空間を作っていくために、以下のルールを守ってね！
				</p>
				<ul className={styles.list}>
					<li>
						配信に関係のない話題を連投しないでください
						<p className={styles.subText}>
							のあとのおしゃべりタイムを一緒に楽しみましょう🌸
						</p>
					</li>
					<li>
						他の人が不快になるようなコメントは禁止です
						<p className={styles.subText}>
							誹謗中傷、過度な下ネタ、荒らし行為などはブロック・通報の対象になります。
						</p>
					</li>
					<li>
						他の配信者さんの名前を話題に出さないようにしましょう
						<p className={styles.subText}>
							コラボ中など特別な場合を除いて、無関係な話題は控えてね。
						</p>
					</li>
					<li>
						ネタバレはやさしく控えめに
						<p className={styles.subText}>
							一緒にゲームや作品を楽しむために、事前情報や展開の予測はご遠慮ください！
						</p>
					</li>
					<li>
						過度な指示・要求コメントはご遠慮ください
						<p className={styles.subText}>
							応援やアドバイスはうれしいけど、のあが楽しく配信できるように見守ってもらえるとうれしいです。
						</p>
					</li>
				</ul>
			</section>
		</div>
	);
}
