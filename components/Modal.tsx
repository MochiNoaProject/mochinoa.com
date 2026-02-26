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

	useEffect(() => {
		if (ref.current && !ref.current.open) {
			ref.current.showModal();
		}
	}, []);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: The dialog is closed by pressing the Escape key.
		<dialog
			ref={ref}
			onCancel={onDismiss}
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
