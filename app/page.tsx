import ActivitiesSection from "./_sections/ActivitiesSection";
import ContactSection from "./_sections/ContactSection";
import HeroSection from "./_sections/HeroSection";
import HobbiesSection from "./_sections/HobbiesSection";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ActivitiesSection />
      <ContactSection />
      <HobbiesSection />
      <footer className={styles.Footer}>
        <small className={styles.Footer__copyright}>
          &copy; 2023 もちもちクリエイト
        </small>
      </footer>
    </main>
  );
}
