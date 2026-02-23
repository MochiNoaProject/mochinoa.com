"use client";

import { useEffect, useRef } from "react";
import styles from "./ClipReveal.module.css";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export function ClipReveal({ children, className }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					observer.disconnect();
					timeoutId = setTimeout(() => {
						el.classList.add(styles.Visible);
					}, 1000);
				}
			},
			{ threshold: 0 },
		);
		observer.observe(el);
		return () => {
			observer.disconnect();
			if (timeoutId !== undefined) clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div ref={ref} className={`${styles.Root} ${className ?? ""}`}>
			{children}
		</div>
	);
}
