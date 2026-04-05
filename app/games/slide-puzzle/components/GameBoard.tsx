"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GameBoard.module.css";

export default function GameBoard() {
	const router = useRouter();
	const [board, setBoard] = useState<number[]>([]);
	const [moves, setMoves] = useState(0);
	const startTimeRef = useRef<number | null>(null);
	const [difficulty, setDifficulty] = useState<"easy" | "hard">("easy");

	const isComplete =
		board.length > 0 && board.every((value, index) => value === index);

	// 移動可能なマスのインデックスを取得
	const getMovableIndices = useCallback(
		(emptyIndex: number) => {
			const size = difficulty === "easy" ? 3 : 4;
			const row = Math.floor(emptyIndex / size);
			const col = emptyIndex % size;
			const movableIndices: number[] = [];

			// 上
			if (row > 0) movableIndices.push(emptyIndex - size);
			// 下
			if (row < size - 1) movableIndices.push(emptyIndex + size);
			// 左
			if (col > 0) movableIndices.push(emptyIndex - 1);
			// 右
			if (col < size - 1) movableIndices.push(emptyIndex + 1);

			return movableIndices;
		},
		[difficulty],
	);

	// ボードをシャッフル
	const shuffleBoard = useCallback(
		(boardToShuffle: number[]) => {
			const shuffled = [...boardToShuffle];
			let emptyIndex = shuffled.indexOf(difficulty === "easy" ? 8 : 15);

			for (let i = 0; i < 100; i++) {
				const movableIndices = getMovableIndices(emptyIndex);
				if (movableIndices.length > 0) {
					const randomIndex =
						movableIndices[Math.floor(Math.random() * movableIndices.length)];
					// 空マスと移動可能なマスを入れ替え
					[shuffled[emptyIndex], shuffled[randomIndex]] = [
						shuffled[randomIndex],
						shuffled[emptyIndex],
					];
					emptyIndex = randomIndex;
				}
			}

			return shuffled;
		},
		[getMovableIndices, difficulty],
	);

	// ボードの初期化
	const initializeBoard = useCallback(() => {
		const size = difficulty === "easy" ? 9 : 16;
		const initialBoard = Array.from({ length: size }, (_, i) => i);
		setBoard(shuffleBoard(initialBoard));
		setMoves(0);
		startTimeRef.current = Date.now();
	}, [shuffleBoard, difficulty]);

	// 初期化
	useEffect(() => {
		initializeBoard();
	}, [initializeBoard]);

	// タイルを移動
	const moveTile = (index: number) => {
		if (isComplete) return;

		const emptyIndex = board.indexOf(difficulty === "easy" ? 8 : 15);
		const movableIndices = getMovableIndices(emptyIndex);

		if (movableIndices.includes(index)) {
			const newBoard = [...board];
			[newBoard[emptyIndex], newBoard[index]] = [
				newBoard[index],
				newBoard[emptyIndex],
			];
			setBoard(newBoard);
			setMoves((prev) => prev + 1);

			// 状態更新後に完成チェックを実行
			const isCompleted = newBoard.every((value, idx) => value === idx);
			if (isCompleted) {
				const finalTime = Date.now() - (startTimeRef.current ?? 0);
				setTimeout(() => {
					router.push(
						`/games/slide-puzzle/complete?time=${finalTime}&moves=${
							moves + 1
						}&difficulty=${difficulty}`,
					);
				}, 500);
			}
		}
	};

	// シャッフルボタンのクリックハンドラ
	const handleShuffle = () => {
		initializeBoard();
	};

	// 難易度切り替え
	const toggleDifficulty = () => {
		setDifficulty((prev) => (prev === "easy" ? "hard" : "easy"));
	};

	const isEasy = difficulty === "easy";
	const gridSize = isEasy ? 3 : 4;
	const emptyTileIndex = isEasy ? 8 : 15;
	const bgImage = isEasy ? "puzzle1" : "puzzle2";
	const bgSize = isEasy ? "300% 300%" : "400% 400%";

	return (
		<div className={styles.container}>
			<div className={styles.controls}>
				<button type="button" onClick={toggleDifficulty}>
					{isEasy ? "難易度: 初級" : "難易度: 上級"}
				</button>
			</div>
			<div className={`${styles.grid} ${!isEasy ? styles.hard : ""}`}>
				{board.map((value, index) => (
					<button
						key={value}
						type="button"
						className={`${styles.tile} ${
							value === emptyTileIndex ? styles.empty : ""
						} ${isComplete ? styles.complete : ""}`}
						style={
							value !== emptyTileIndex
								? {
										backgroundImage: `url(/images/slide-puzzle/${bgImage}.jpg)`,
										backgroundSize: bgSize,
										backgroundPosition: `${-(value % gridSize) * 100}% ${
											-Math.floor(value / gridSize) * 100
										}%`,
										transform: `translate(${(index % gridSize) * 100}%, ${
											Math.floor(index / gridSize) * 100
										}%)`,
									}
								: {
										transform: `translate(${(index % gridSize) * 100}%, ${
											Math.floor(index / gridSize) * 100
										}%)`,
									}
						}
						onClick={() => value !== emptyTileIndex && moveTile(index)}
					/>
				))}
			</div>
			<div className={styles.controls}>
				<p>移動回数: {moves}</p>
				{!isComplete ? (
					<button type="button" onClick={handleShuffle}>
						シャッフル
					</button>
				) : null}
			</div>
		</div>
	);
}
