"use client";

import { useEffect, useRef, useState } from "react";

export const MarryOff = ({ className }: { className?: string }) => {
	const [score, setScore] = useState<number>();
	const fired = useRef(false);
	useEffect(() => {
		if (fired.current) {
			return;
		}
		const start = Date.now();
		fired.current = true;

		let flag = true;
		while (flag) {
			const ok = window.confirm("望月のあと結婚したいですか？");
			if (ok) {
				window.alert("いい子");
				flag = false;
				const end = Date.now();
				setScore((end - start) / 1000);
			} else {
				window.alert("は？");
			}
		}
	}, []);
	return (
		<div className={className}>
			{score !== undefined ? (
				<div>
					<p>あなたが結婚に同意するまで、{score}秒かかりました。</p>
					<p>
						{score > 3
							? "なんですぐに答えられないのかな。"
							: score > 1
								? "もう少し頑張りましょう。"
								: "まあ合格やな。"}
					</p>
				</div>
			) : null}
		</div>
	);
};
