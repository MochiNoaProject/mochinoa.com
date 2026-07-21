"use client";

import { X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { useGlobalKeydown } from "../../../components/hooks/useGlobalKeydown";
import styles from "./page.module.css";

interface ImageModalProps {
	src: string | StaticImageData;
	alt: string;
}

// BEST PRACTICE: Hoist Static JSX Elements (rendering-hoist-jsx.md)
const zoomInIconLarge = <ZoomIn size={32} />;
const zoomInIconSmall = <ZoomIn size={20} />;
const zoomOutIconSmall = <ZoomOut size={20} />;
const closeIcon = <X size={24} />;

export function ImageModal({ src, alt }: ImageModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isZoomed, setIsZoomed] = useState(false);

	const openModal = () => {
		setIsOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setIsZoomed(false);
		document.body.style.overflow = "unset";
	}, []);

	const onEscEvent = useEffectEvent((e: KeyboardEvent) => {
		if (e.key === "Escape") closeModal();
	});

	useGlobalKeydown(onEscEvent);

	useEffect(() => {
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const toggleZoom = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsZoomed((prev) => !prev);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			openModal();
		}
	};

	return (
		<>
			<button
				className={styles.chartPeek}
				onClick={openModal}
				onKeyDown={handleKeyDown}
				type="button"
				aria-label="画像を拡大表示"
			>
				<Image src={src} alt={alt} className={styles.chartImage} />
				<div className={styles.chartOverlay}>
					{zoomInIconLarge}
					<span>クリックで拡大</span>
				</div>
			</button>

			<AnimatePresence>
				{isOpen ? (
					<motion.div
						className={styles.modalBackdrop}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) closeModal();
						}}
						onKeyDown={(e) => {
							if (e.key === "Escape") closeModal();
						}}
						role="dialog"
						aria-modal="true"
						aria-label="画像拡大表示"
					>
						<button
							className={styles.modalClose}
							onClick={closeModal}
							aria-label="閉じる"
							type="button"
						>
							{closeIcon}
						</button>

						<div className={styles.modalContent}>
							<button
								className={`${styles.modalImageWrapper} ${isZoomed ? styles.zoomed : ""}`}
								onClick={toggleZoom}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										toggleZoom(e as unknown as React.MouseEvent);
									}
								}}
								type="button"
								aria-label={isZoomed ? "縮小する" : "さらに拡大する"}
							>
								<Image
									src={src}
									alt={alt}
									className={styles.modalImage}
									priority
								/>
							</button>

							<div className={styles.modalControls}>
								<button
									onClick={toggleZoom}
									className={styles.zoomButton}
									type="button"
								>
									{isZoomed ? zoomOutIconSmall : zoomInIconSmall}
									{isZoomed ? "縮小" : "拡大"}
								</button>
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}
