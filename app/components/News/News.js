import Image from "next/image";
import styles from "./News.module.css";

const NEWS = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/news/01-keynote.png",
    href: "#",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/news/02-eames.png",
    href: "#",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/news/03-books.png",
    href: "#",
  },
];

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5.5 12.5 L12.5 5.5" />
      <path d="M6.5 5.5 H12.5 V11.5" />
    </svg>
  );
}

export default function News() {
  return (
    <section id="news" className={styles.root} aria-labelledby="news-title">
      <div className={styles.container}>
        <div className={styles.titleWrap}>
          <h2 id="news-title" className={styles.title}>
            <span>Keep up with my latest</span>
            <span>news &amp; achievements</span>
          </h2>
        </div>

        <ol className={styles.list}>
          {NEWS.map((item, i) => (
            <li
              key={i}
              className={`${styles.card} ${styles[`card${i + 1}`]}`}
            >
              <a href={item.href} className={styles.cardLink}>
                <div className={styles.cardImageWrap}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 353px, 85vw"
                    className={styles.cardImage}
                  />
                </div>
                <p className={styles.cardDescription}>{item.description}</p>
                <span className={styles.cardReadMore}>
                  Read more
                  <ArrowUpRight />
                </span>
              </a>
              {i < NEWS.length - 1 && (
                <span className={styles.divider} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
