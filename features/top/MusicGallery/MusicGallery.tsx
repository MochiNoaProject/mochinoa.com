"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import tag1Img from "../../../app/_assets/images/タグ1.png";
import type { Song } from "../../../app/_site.config";
import styles from "./MusicGallery.module.css";

const THUMB_BLOBS = [
	"60% 40% 30% 70% / 60% 30% 70% 40%",
	"30% 70% 70% 30% / 50% 50% 30% 70%",
	"70% 30% 50% 50% / 30% 30% 70% 70%",
	"40% 60% 60% 40% / 70% 30% 40% 60%",
	"55% 45% 25% 75% / 75% 25% 65% 35%",
	"75% 25% 45% 55% / 35% 65% 55% 45%",
	"45% 55% 55% 45% / 60% 40% 25% 75%",
	"35% 65% 40% 60% / 45% 55% 70% 30%",
];

const ITEM_SIZE = 64;
const ITEM_GAP = 12;
const ITEM_STEP = ITEM_SIZE + ITEM_GAP;
const SCROLL_SPEED = 30;

function TagTitleMarquee({ title }: { title: string }) {
	const containerRef = useRef<HTMLSpanElement>(null);
	const measureRef = useRef<HTMLSpanElement>(null);
	const [overflows, setOverflows] = useState(false);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const measure = measureRef.current;
		if (!container || !measure) return;
		setOverflows(measure.scrollWidth > container.clientWidth);
	});

	return (
		<span ref={containerRef} className={styles.TagTitle}>
			<span ref={measureRef} className={styles.TagMeasure} aria-hidden="true">
				{title}
			</span>
			{overflows ? (
				<span className={styles.TagTitleInner}>
					{[0, 1, 2, 3].map((i) => (
						<span key={i} style={{ minWidth: 80, display: "inline-block" }}>
							{title}
						</span>
					))}
				</span>
			) : (
				<span className={styles.TagTitleStatic}>{title}</span>
			)}
		</span>
	);
}

type Props = {
	songs: readonly Song[];
};

export function MusicGallery({ songs }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const isPausedRef = useRef(false);
	const posRef = useRef(0);
	const trackRef = useRef<HTMLDivElement>(null);
	const selectedRef = useRef(0);

	const setWidth = songs.length * ITEM_STEP;

	useEffect(() => {
		let lastTime: number | null = null;
		let rafId: number;

		const tick = (time: number) => {
			if (lastTime !== null && !isPausedRef.current) {
				const dt = Math.min((time - lastTime) / 1000, 0.1);
				posRef.current -= SCROLL_SPEED * dt;

				if (posRef.current <= -setWidth) {
					posRef.current += setWidth;
				}

				if (trackRef.current) {
					trackRef.current.style.transform = `translateX(${posRef.current}px)`;
				}

				const offset = ((-posRef.current % setWidth) + setWidth) % setWidth;
				const newIdx = Math.floor(offset / ITEM_STEP) % songs.length;
				if (newIdx !== selectedRef.current) {
					selectedRef.current = newIdx;
					setSelectedIndex(newIdx);
				}
			}
			lastTime = time;
			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, [songs.length, setWidth]);

	const handleMouseEnter = useCallback(() => {
		isPausedRef.current = true;
	}, []);

	const handleMouseLeave = useCallback(() => {
		isPausedRef.current = false;
	}, []);

	const handleClick = useCallback((index: number) => {
		selectedRef.current = index;
		setSelectedIndex(index);
	}, []);

	const tripled = [...songs, ...songs, ...songs];
	const selected = songs[selectedIndex];

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover to pause marquee animation
		<div
			className={styles.MusicGallery}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div>
				<a
					href={selected.url}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.FeaturedLink}
					style={{
						position: "relative",
						paddingLeft: 16,
					}}
				>
					<div className={styles.FeaturedBlob}>
						<AnimatePresence>
							<motion.div
								key={selectedIndex}
								className={styles.FeaturedImageWrapper}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4 }}
							>
								<Image
									src={selected.thumbnail}
									alt={selected.title}
									fill
									sizes="200px"
									className={styles.FeaturedImage}
								/>
							</motion.div>
						</AnimatePresence>
					</div>
					<div style={{
						position: "absolute",
						bottom: -16,
						right: 16,
						rotate: "10deg",
					}}>
						<Image
							src={tag1Img}
							alt=""
							width={80}
							height={(tag1Img.height / tag1Img.width) * 80}						
						/>
						<AnimatePresence mode="wait">
							<motion.div
								key={selectedIndex}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								<TagTitleMarquee title={selected.title} />
							</motion.div>
						</AnimatePresence>
					</div>
				</a>
			</div>

			<div className={styles.TrackContainer}>
				<div ref={trackRef} className={styles.Track}>
					{tripled.map((song, i) => {
						const idx = i % songs.length;
						const isActive = idx === selectedIndex;
						return (
							<button
								key={`${Math.floor(i / songs.length)}-${song.title}`}
								type="button"
								className={`${styles.ThumbnailButton} ${isActive ? styles.ThumbnailActive : ""}`}
								onClick={() => handleClick(idx)}
								title={song.title}
							>
								<div
									className={styles.ThumbnailBlob}
									style={{
										borderRadius: THUMB_BLOBS[idx % THUMB_BLOBS.length],
									}}
								>
									<Image
										src={song.thumbnail}
										alt={song.title}
										width={64}
										height={64}
										className={styles.Thumbnail}
									/>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
