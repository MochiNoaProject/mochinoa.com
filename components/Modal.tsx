"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const ref = useRef<HTMLDialogElement | null>(null);

	const onDismiss = useCallback(() => {
		router.back();
	}, [router]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onDismiss();
			}
		},
		[onDismiss],
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [onKeyDown]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<dialog
			ref={(node) => {
				node?.showModal();
				ref.current = node;
			}}
			onClick={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				if (
					rect.left > event.clientX ||
					rect.right < event.clientX ||
					rect.top > event.clientY ||
					rect.bottom < event.clientY
				) {
					onDismiss();
				}
			}}
			className={styles.root}
		>
			<button className={styles.CloseButton} type="button" onClick={onDismiss}>
				閉じる
			</button>
			<div>{children}</div>
		</dialog>
	);
}
