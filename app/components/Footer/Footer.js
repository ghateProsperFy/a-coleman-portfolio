import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.root}>
      <div className={styles.top}>
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            <span>Have a </span>
            <strong>project</strong>
            <span> in mind?</span>
          </p>
          <a href="#" className={styles.ctaButton}>
            Let&rsquo;s talk
          </a>
        </div>

        <ul className={styles.socialLeft}>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>

        <ul className={styles.socialRight}>
          <li>
            <a href="#">x.com</a>
          </li>
          <li>
            <a href="#">Linkedin</a>
          </li>
        </ul>
      </div>

      <hr className={styles.divider} aria-hidden="true" />

      <div className={styles.bottom}>
        <ul className={styles.legal}>
          <li>
            <a href="#">Licences</a>
          </li>
          <li>
            <a href="#">Privacy policy</a>
          </li>
        </ul>

        <p className={styles.coded}>[ Coded by Claude ]</p>

        <p className={styles.brand} aria-label="H.Studio">
          H.Studio
        </p>
      </div>
    </footer>
  );
}
