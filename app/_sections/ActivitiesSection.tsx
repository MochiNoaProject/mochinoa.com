import activities from "../../data/activities.json";
import styles from "./ActivitiesSection.module.css";

export default function ActivitiesSection() {
  return (
    <section className={styles.root} id="activity">
      <h2 className={styles.Title}>今までの活動</h2>

      <div className={styles.ActivityList}>
        {activities.map(({ title, description }) => {
          return (
            <div className={styles.ActivityItem} key={title}>
              <h3 className={styles.ActivityItem__title}>{title}</h3>
              <p className={styles.ActivityItem__description}>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
