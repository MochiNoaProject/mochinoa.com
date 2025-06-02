import Image from "next/image";
import Link from "next/link";
import styles from "./AppHeader.module.css";

// Removed backgroundColor from props, as the header will now consistently use the primary brand color.
interface AppHeaderProps {}

export const AppHeader = (props: AppHeaderProps) => {
	// Placeholder navigation links
	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/about", label: "About" }, // Assuming an /about page
		{ href: "/videos", label: "Videos" }, // Assuming a /videos page
		{ href: "/contact", label: "Contact" }, // Assuming a /contact page
	];

	return (
		<header className={styles.container}>
			<Link href="/" className={styles.logoLink}>
				<Image
					priority
					width={146}
					height={(146 / 400) * 155}
					src="/img/logo.png"
					alt="望月のあ Official Site Logo" // Updated alt text for clarity
				/>
			</Link>
			<nav>
				<ul className={styles.navLinks}>
					{navItems.map((item) => (
						<li key={item.href} className={styles.navLink}>
							<Link href={item.href}>{item.label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
