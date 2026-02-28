import type { ReactNode } from "react";
import styles from "./TapeDecoration.module.css";

type TapePosition = "topRight" | "topLeft";
type TapeColor = "pink" | "teal";

type TapeDecorationProps = {
	children: ReactNode;
	position?: TapePosition;
	color?: TapeColor;
};

export function TapeDecoration({
	children,
	position = "topRight",
	color = "pink",
}: TapeDecorationProps) {
	return (
		<span
			className={styles.wrapper}
			data-position={position}
			data-color={color}
		>
			{children}
		</span>
	);
}
