import GameBoard from "./components/GameBoard";
import { slidePuzzleMetadata } from "./metadata";
import styles from "./page.module.css";

export const metadata = slidePuzzleMetadata;

export default function SlidePuzzlePage() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>スライドパズル</h1>
			<GameBoard />
		</div>
	);
}
