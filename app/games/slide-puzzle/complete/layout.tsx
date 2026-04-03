import type { ReactNode } from "react";
import { slidePuzzleMetadata } from "../metadata";

export const metadata = slidePuzzleMetadata;

type Props = {
	children: ReactNode;
};

export default function CompleteLayout({ children }: Props) {
	return <>{children}</>;
}
