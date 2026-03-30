import dynamic from "next/dynamic";
import { CursorSparkles } from "../components/CursorSparkles/CursorSparkles";
import { HeroSection } from "../features/top/HeroSection/HeroSection";
import { siteConfig } from "./_site.config";
import "../styles/page.global.css";
import styles from "./page.module.css";

const BannerSection = dynamic(() =>
	import("../features/top/BannerSection/BannerSection").then(
		(mod) => mod.BannerSection,
	),
);
const ContactSection = dynamic(() =>
	import("../features/top/ContactSection/ContactSection").then(
		(mod) => mod.ContactSection,
	),
);
const MusicGallery = dynamic(() =>
	import("../features/top/MusicGallery/MusicGallery").then(
		(mod) => mod.MusicGallery,
	),
);
const PortraitSection = dynamic(() =>
	import("../features/top/PortraitSection/PortraitSection").then(
		(mod) => mod.PortraitSection,
	),
);
const ProfileSection = dynamic(() =>
	import("../features/top/ProfileSection/ProfileSection").then(
		(mod) => mod.ProfileSection,
	),
);
const ShopSection = dynamic(() =>
	import("../features/top/ShopSection/ShopSection").then(
		(mod) => mod.ShopSection,
	),
);
const SideNav = dynamic(() =>
	import("../features/top/SideNav/SideNav").then((mod) => mod.SideNav),
);

const WAVE_W = 1000;
const WAVE_ARC_DEPTH = 60;
const WAVE_SCALLOP_COUNT = 14;
const WAVE_SCALLOP_FLATNESS = 0.75;

function buildScallopedArcPath() {
	const R =
		(WAVE_W * WAVE_W + 4 * WAVE_ARC_DEPTH * WAVE_ARC_DEPTH) /
		(8 * WAVE_ARC_DEPTH);
	const halfAngle = Math.asin(WAVE_W / (2 * R));

	const points: [number, number][] = [];
	for (let i = 0; i <= WAVE_SCALLOP_COUNT; i++) {
		const theta = -halfAngle + (2 * halfAngle * i) / WAVE_SCALLOP_COUNT;
		points.push([
			WAVE_W / 2 + R * Math.sin(theta),
			WAVE_ARC_DEPTH - R * (1 - Math.cos(theta)),
		]);
	}

	let d = `M 0 0 L ${WAVE_W} 0`;
	let maxY = 0;

	for (let i = WAVE_SCALLOP_COUNT; i > 0; i--) {
		const [px, py] = points[i];
		const [tx, ty] = points[i - 1];
		const dx = tx - px;
		const dy = ty - py;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const r = dist * WAVE_SCALLOP_FLATNESS;
		const bulge = r - Math.sqrt(r * r - (dist / 2) ** 2);
		const midY = (py + ty) / 2 + bulge;
		if (midY > maxY) maxY = midY;
		d += ` A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${tx.toFixed(1)} ${ty.toFixed(1)}`;
	}

	d += " Z";
	return { d, height: Math.ceil(maxY) - 2 };
}

const wavePath = buildScallopedArcPath();

const staticBackground = (
	<div className={styles.fixedBackground}>
		<div className={styles.skyArea}>
			<svg
				className={styles.wave}
				aria-label="wave"
				viewBox={`0 0 ${WAVE_W} ${wavePath.height}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d={wavePath.d} fill="#63bac7" />
			</svg>
		</div>
	</div>
);

export default function Page() {
	return (
		<main className={styles.Root}>
			<CursorSparkles />
			{/* Fixed background: pink + teal sky with scallop wave */}
			{staticBackground}

			<div className={styles.MainContent}>
				<div className={styles.LeftColumn}>
					<PortraitSection />
				</div>
				<div className={styles.CenterColumn}>
					{/* Hero */}
					<HeroSection />

					{/* Profile */}
					<ProfileSection />

					{/* Music Gallery */}
					<div className={styles.MusicGalleryWrapper}>
						<MusicGallery songs={siteConfig.songs} />
					</div>

					{/* Shop */}
					<ShopSection />

					{/* Banners */}
					<BannerSection />

					{/* Contact */}
					<ContactSection />
				</div>
				<div className={styles.RightColumn}>
					<SideNav />
				</div>
			</div>
		</main>
	);
}
