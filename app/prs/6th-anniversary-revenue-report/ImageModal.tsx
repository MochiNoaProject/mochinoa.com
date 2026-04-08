"use client";

import { X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

interface ImageModalProps {
	src: string | StaticImageData;
	alt: string;
}

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

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => {
			window.removeEventListener("keydown", handleEsc);
			document.body.style.overflow = "unset";
		};
	}, [closeModal]);

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
					<ZoomIn size={32} />
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
							<X size={24} />
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
									{isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
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
