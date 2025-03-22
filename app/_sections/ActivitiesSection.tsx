import Chibi from "../../components/Chibi";
import items from "../../data/activities.json";
import styles from "./ActivitiesSection.module.css";

export default function ActivitiesSection() {
	return (
		<section className={styles.root} id="activity">
			<h2 className={styles.Title}>今までの活動</h2>

			<div className={styles.ActivityList}>
				{items.map((item, index) => {
					const date = new Date(item.date);
					const dateHidden = items[index - 1]?.date === item.date;
					return (
						<div className={styles.ActivityItem} key={item.title}>
							<div>
								{dateHidden ? null : (
									<time
										dateTime={date.toISOString()}
										className={styles.ActivityItem__date}
									>
										{date.getFullYear()}年
										{`${date.getMonth() + 1}`.padStart(2, "0")}月
									</time>
								)}
							</div>
							<div className={styles.ActivityItem__content}>
								<h3 className={styles.ActivityItem__title}>
									<a href={item.link} target="_blank" rel="noopener noreferrer">
										{item.title}
									</a>
								</h3>
								<p className={styles.ActivityItem__description}>
									{item.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<Chibi variant="セーラーショート" position="right" />
		</section>
	);
}
