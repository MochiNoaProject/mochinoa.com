import Image from "next/image";
import Link from "next/link";
import styles from "./AppHeader.module.css";

interface AppHeaderProps {
	backgroundColor?: string;
}

export const AppHeader = (props: AppHeaderProps) => {
	return (
		<header
			className={styles.container}
			style={{
				backgroundColor: props.backgroundColor,
			}}
		>
			<Link href="/">
				<Image
					priority
					width={146}
					height={(146 / 400) * 155}
					src="/img/logo.png"
					alt="望月のあ Official Site"
				/>
			</Link>
		</header>
	);
};
