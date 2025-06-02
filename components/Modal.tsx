"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react"; // Added useState
import styles from "./Modal.module.css";

export default function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const ref = useRef<HTMLDialogElement | null>(null);
	const [isClosing, setIsClosing] = useState(false); // To prevent multiple dismiss calls

	const onDismiss = useCallback(() => {
		if (isClosing || !ref.current) {
			return;
		}

		// Check if the class is already there, though isClosing should prevent re-entry
		if (!ref.current.classList.contains(styles.rootClosing)) {
			setIsClosing(true); // Set closing state
			ref.current.classList.add(styles.rootClosing);

			setTimeout(() => {
				router.back();
				// Resetting isClosing might not be necessary if component unmounts,
				// but good if it could be re-opened without unmounting/remounting.
				// setIsClosing(false);
			}, 250); // Duration of the exit animation (0.25s)
		}
	}, [router, isClosing]); // Added isClosing to dependencies

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
