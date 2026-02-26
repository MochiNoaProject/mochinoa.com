"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./ClipReveal.module.css";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export function ClipReveal({ children, className }: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					observer.disconnect();
					timeoutId = setTimeout(() => {
						setIsVisible(true);
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
		<div
			ref={ref}
			className={clsx(styles.Root, isVisible && styles.Visible, className)}
		>
			{children}
		</div>
	);
}
