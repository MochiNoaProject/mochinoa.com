import ActivitiesSection from "./_sections/ActivitiesSection";
import ContactSection from "./_sections/ContactSection";
import HeroSection from "./_sections/HeroSection";
import HobbiesSection from "./_sections/HobbiesSection";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <nav className={styles.AppMenu}>
        <ul className={styles.AppMenu__list}>
          {[
            {
              href: "#top",
              label: "トップ",
            },
            {
              href: "#activity",
              label: "実績",
            },
            {
              href: "#contact",
              label: "お問い合わせ",
            },
            {
              href: "#app",
              label: "アプリ",
            },
          ].map((item) => {
            return (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
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
