import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.root} aria-labelledby="intro-statement">
      <div className={styles.container}>
        <header className={styles.eyebrowRow}>
          <p className={styles.eyebrow}>[ 8+ years in industry ]</p>
          <hr className={styles.rule} aria-hidden="true" />
        </header>

        <h2 id="intro-statement" className={styles.statement}>
          <span className={`${styles.line} ${styles.line1}`}>
            <span className={styles.indexLabel} aria-hidden="true">
              001
            </span>
            <span className={styles.lineText}>
              A creative director&nbsp;&nbsp;/
            </span>
          </span>

          <span className={`${styles.line} ${styles.line2}`}>Photographer</span>

          <span className={`${styles.line} ${styles.line3}`}>
            Born <span className={styles.amp}>&amp;</span> raised
          </span>

          <span className={`${styles.line} ${styles.line4}`}>
            on the south side
          </span>

          <span className={`${styles.line} ${styles.line5}`}>
            <span className={styles.lineText}>of chicago.</span>
            <span className={styles.tagLabel} aria-hidden="true">
              [ creative freelancer ]
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
