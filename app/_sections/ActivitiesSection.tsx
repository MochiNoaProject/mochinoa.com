import activities from "../../data/activities.json";
import styles from "./ActivitiesSection.module.css";

export default function ActivitiesSection() {
  return (
    <section className={styles.root}>
      <h2 className={styles.Title}>今までの活動</h2>

      <div className={styles.ActivityList}>
        {activities.map(({ title, description }) => {
          return (
            <div key={title}>
              <h3 className={styles.ActivityItem__title}>{title}</h3>
              <p className={styles.ActivityList__description}>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
