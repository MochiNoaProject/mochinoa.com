import { siteConfig } from "../../../app/_site.config";
import { ClipReveal } from "../../../components/ClipReveal/ClipReveal";
import { WavyTitle } from "../../../components/WavyTitle/WavyTitle";
import styles from "./ContactSection.module.css";

export const ContactSection = () => {
	return (
		<div className={styles.ContactSection}>
			<ClipReveal>
				<WavyTitle
					text="お仕事に関するお問い合わせ"
					style={{
						fontSize: 16,
						color: "var(--color-teal)",
						textAlign: "right",
					}}
				/>
			</ClipReveal>
			<div className={styles.Description}>
				お仕事に関するお問い合わせや コラボのお誘いについては、Xの
				DMまたは下記のメールアドレス までご連絡ください。案件や企
				画などは詳細を最初に共有して いただけるとやり取りがスムー
				ズに進むので助かります。特に 支障がなければ2,3日以内に返信
				させていただきます。
			</div>
			<p className={styles.Email}>連絡先： {siteConfig.contact.email}</p>
		</div>
	);
};
