import styles from "./WavyTitle.module.css";

type WavyTitleProps = {
	text: string;
	amp?: number;
	className?: string;
};

const UNDERLINE_W = 200;

function buildUnderlinePath(amp: number) {
	const steps = 100;
	const h = amp * 2;
	const cy = amp;
	let d = "";
	for (let i = 0; i <= steps; i++) {
		const x = (i / steps) * UNDERLINE_W;
		const y = cy - Math.sin((i / steps) * Math.PI * 2) * amp;
		d += `${i === 0 ? "M" : " L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
	}
	return { d, h };
}

export function WavyTitle({ text, amp = 6, className }: WavyTitleProps) {
	const chars = [...text];
	const underline = buildUnderlinePath(amp);

	return (
		<p className={className}>
			<span className={styles.Root}>
				{chars.map((char, i) => {
					const key = `${char}-${i}`;
					const offset = -Math.sin((i / (chars.length - 1)) * Math.PI * 2) * amp;
					return (
						<span
							key={key}
							className={styles.Char}
							style={{ transform: `translateY(${offset}px)` }}
						>
							{char}
						</span>
					);
				})}
				<svg
					className={styles.Underline}
					style={{ height: underline.h }}
					viewBox={`0 0 ${UNDERLINE_W} ${underline.h}`}
					preserveAspectRatio="none"
					aria-label="underline"
				>
					<path
						d={underline.d}
						stroke="currentColor"
						fill="none"
						strokeDasharray="3 3"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
			</span>
		</p>
	);
}
