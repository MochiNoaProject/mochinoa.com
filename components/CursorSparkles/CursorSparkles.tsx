"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorSparkles.module.css";

const COLORS = [
	"#ff7eb3",
	"#ffde59",
	"#7ec8e3",
	"#c17aff",
	"#7fffd4",
	"#ffb347",
	"#ff6b6b",
	"#a0e7e5",
];

const STAR_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0l3.09 7.26L23 8.27l-5.46 5.04L18.81 22 12 17.77 5.19 22l1.27-8.69L1 8.27l7.91-1.01z"/></svg>`;

const MIN_SIZE = 5;
const MAX_SIZE = 12;
const MAX_SPARKLES = 35;
const THROTTLE_MS = 4;

export function CursorSparkles() {
	const containerRef = useRef<HTMLDivElement>(null);
	const countRef = useRef(0);
	const lastTimeRef = useRef(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleMouseMove = (e: MouseEvent) => {
			const now = performance.now();
			if (now - lastTimeRef.current < THROTTLE_MS) return;
			if (countRef.current >= MAX_SPARKLES) return;
			lastTimeRef.current = now;

			const sparkle = document.createElement("div");
			const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
			const color = COLORS[Math.floor(Math.random() * COLORS.length)];
			const offsetX = (Math.random() - 0.5) * 20;
			const offsetY = (Math.random() - 0.5) * 20;

			sparkle.innerHTML = STAR_SVG;
			sparkle.className = styles.sparkle;
			sparkle.style.left = `${e.clientX + offsetX}px`;
			sparkle.style.top = `${e.clientY + offsetY}px`;
			sparkle.style.width = `${size}px`;
			sparkle.style.height = `${size}px`;
			sparkle.style.color = color;

			container.appendChild(sparkle);
			countRef.current++;

			sparkle.addEventListener(
				"animationend",
				() => {
					sparkle.remove();
					countRef.current--;
				},
				{ once: true },
			);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return <div ref={containerRef} className={styles.container} />;
}
