import Image from "next/image";
import type { Song } from "../../../app/_site.config";
import styles from "./MusicGallery.module.css";

type Props = {
	songs: readonly Song[];
};

export function MusicGallery({ songs }: Props) {
	const featured = songs[0];

	return (
		<div className={styles.MusicGallery}>
			<div className={styles.Featured}>
				<div className={styles.FeaturedTapeTopLeft} />
				<Image
					src={featured.thumbnail}
					alt={featured.title}
					fill
					sizes="(max-width: 640px) 100vw, 592px"
					className={styles.FeaturedImage}
				/>
				<div className={styles.FeaturedTapeBottomRight} />
			</div>

			<div className={styles.Track}>
				{songs.map((song) => (
					<a
						key={song.title}
						href={song.url}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.ThumbnailLink}
						title={song.title}
					>
						<Image
							src={song.thumbnail}
							alt={song.title}
							width={64}
							height={64}
							className={styles.Thumbnail}
						/>
					</a>
				))}
			</div>
		</div>
	);
}
