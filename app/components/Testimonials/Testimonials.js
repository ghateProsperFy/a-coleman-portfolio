import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    name: "Lukas Weber",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: "/images/testimonials/01-lukas.svg",
    logoWidth: 138,
    logoHeight: 19,
  },
  {
    name: "Marko Stojković",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: "/images/testimonials/02-marko.svg",
    logoWidth: 143,
    logoHeight: 19,
  },
  {
    name: "Sarah Jenkins",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.",
    logo: "/images/testimonials/03-sarah.svg",
    logoWidth: 109,
    logoHeight: 31,
  },
  {
    name: "Sofia Martínez",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: "/images/testimonials/04-sofia.svg",
    logoWidth: 81,
    logoHeight: 36,
  },
];

export default function Testimonials() {
  return (
    <section className={styles.root} aria-labelledby="testimonials-title">
      <h2 id="testimonials-title" className={styles.title}>
        Testimonials
      </h2>

      <div className={styles.scroller}>
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={`${styles.card} ${styles[`card${i + 1}`]}`}
          >
            <div className={styles.logo}>
              <Image
                src={t.logo}
                alt=""
                width={t.logoWidth}
                height={t.logoHeight}
              />
            </div>
            <blockquote className={styles.quote}>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className={styles.author}>{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
