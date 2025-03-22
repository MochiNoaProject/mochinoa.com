"use client";
import { useCallback, useRef } from "react";
import styles from "./useModal.module.css";

export const useModal = (Content: () => React.ReactNode) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const Modal = useCallback(() => {
		return (
			<dialog ref={dialogRef} className={styles.container}>
				<form method="dialog">
					<Content />
				</form>
			</dialog>
		);
	}, [Content]);
	const open = useCallback(() => {
		dialogRef.current?.showModal();
	}, []);
	return [Modal, open] as const;
};
