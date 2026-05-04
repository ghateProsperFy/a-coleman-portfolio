import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.root} aria-labelledby="about-eyebrow">
      <div className={styles.container}>
        <p id="about-eyebrow" className={styles.eyebrow}>
          [ About ]
        </p>

        <div className={styles.bracketed}>
          <span
            className={`${styles.corner} ${styles.cornerTL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerTR}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBL}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.corner} ${styles.cornerBR}`}
            aria-hidden="true"
          />
          <p className={styles.aboutText}>
            Placeholder paragraph one. This is where you introduce yourself
            &mdash; your background, your passion for your craft, and what
            drives you creatively. Two to three sentences work best here.
            Placeholder paragraph two. Here you can describe your technical
            approach, how you collaborate with clients, or what sets your
            work apart from others in your field.
          </p>
        </div>

        <div className={styles.imageGroup}>
          <p className={styles.indexLabel} aria-hidden="true">
            002
          </p>
          <div className={styles.imageWrap}>
            <Image
              src="/images/about/portrait.png"
              alt="Portrait of Harvey Specter"
              fill
              sizes="(min-width: 1024px) 436px, 100vw"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
