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
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ActivityItem}
              key={item.title}
            >
              <div className={styles.ActivityItem__date}>
                {dateHidden ? null : (
                  <time dateTime={date.toISOString()}>
                    {date.toLocaleDateString("ja", {
                      year: "numeric",
                      month: "long",
                    })}
                  </time>
                )}
              </div>
              <div className={styles.ActivityItem__content}>
                <h3 className={styles.ActivityItem__title}>{item.title}</h3>
                <p className={styles.ActivityItem__description}>
                  {item.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      <Chibi variant="セーラーショート" position="right" />
    </section>
  );
}
