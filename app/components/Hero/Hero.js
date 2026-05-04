import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import styles from "./Hero.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  return (
    <section className={styles.root}>
      <div className={styles.bgImage}>
        <Image
          src="/images/hero/portrait.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 170vw, 140vw"
        />
      </div>

      <div className={styles.blurBand} aria-hidden="true" />

      <nav className={styles.nav} aria-label="Primary">
        <Link href="/" className={styles.logo}>
          H.Studio
        </Link>

        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={`${styles.button} ${styles.navButton}`}>
          Let&rsquo;s talk
        </a>

        <MobileMenu />
      </nav>

      <div className={styles.content}>
        <div className={styles.headlineGroup}>
          <p className={styles.eyebrow}>[ Hello i&rsquo;m ]</p>
          <h1 className={styles.headline}>
            <span>Harvey</span>
            <span>Specter</span>
          </h1>
        </div>

        <div className={styles.descBlock}>
          <p className={styles.description}>
            H.Studio is a <em>full-service</em> creative studio creating
            beautiful digital experiences and products. We are an{" "}
            <em>award winning</em> desing and art group specializing in
            branding, web design and engineering.
          </p>
          <a href="#contact" className={styles.button}>
            Let&rsquo;s talk
          </a>
        </div>
      </div>
    </section>
  );
}
