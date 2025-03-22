import Chibi from "../../components/Chibi";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
	return (
		<section id="contact" className={styles.root}>
			<div className={styles.Card}>
				<h2 className={styles.Title}>お仕事の依頼、コラボなどのご相談</h2>
				<div className={styles.Contents}>
					<p>
						<a
							href="https://twitter.com/_noach"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.TwitterLink}
						>
							TwitterのDM
						</a>
						までよろしくお願いします。
					</p>
					<p>
						案件や企画などは詳細を最初に共有させていただけると助かります。
						特に支障がなければ、2,3日以内に返信させていただきます。
					</p>
					<p>
						Twitterをご利用でない場合や、メールでのご相談を希望される場合は、以下のメールアドレスにご連絡ください。
					</p>
					<p>連絡先 : mochizuki.noa.project@gmail.com</p>
				</div>
			</div>
			<Chibi variant="ウェーブ猫耳" position="center" />
		</section>
	);
}
