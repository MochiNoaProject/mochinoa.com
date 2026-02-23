import styles from "./ProfileSection.module.css";

export const ProfileSection = () => {
	return (
		<div>
			<div className={styles.ProfileSection}>
				<div className={styles.TextWrapper}>
					<h2>望月 のあ</h2>
					<p>コンテンツクリエイター</p>
				</div>
				<p className={styles.TextWrapper}>
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
	);
};
