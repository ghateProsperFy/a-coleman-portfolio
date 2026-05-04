import Image from "next/image";
import styles from "./Work.module.css";

const PROJECTS = [
  {
    name: "Surfers paradise",
    image: "/images/work/01-surfers-paradise.png",
    aspect: "676 / 744",
    tags: ["Social Media", "Photography"],
    href: "#",
  },
  {
    name: "Cyberpunk caffe",
    image: "/images/work/02-cyberpunk-caffe.png",
    aspect: "676 / 699",
    tags: ["Social Media", "Photography"],
    href: "#",
  },
  {
    name: "Agency 976",
    image: "/images/work/03-agency-976.png",
    aspect: "676 / 699",
    tags: ["Social Media", "Photography"],
    href: "#",
  },
  {
    name: "Minimal Playground",
    image: "/images/work/04-minimal-playground.png",
    aspect: "676 / 744",
    tags: ["Social Media", "Photography"],
    href: "#",
  },
];

function ArrowUpRight() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 22 L22 10" />
      <path d="M12 10 H22 V20" />
    </svg>
  );
}

function ProjectCard({ project, slotClassName }) {
  return (
    <article className={`${styles.card} ${slotClassName}`}>
      <a href={project.href} className={styles.cardLink}>
        <div
          className={styles.cardImageWrap}
          style={{ aspectRatio: project.aspect }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={styles.cardImage}
          />
          <div className={styles.cardChips}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.chip}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.cardCaption}>
          <h3 className={styles.cardName}>{project.name}</h3>
          <span className={styles.cardArrow} aria-hidden="true">
            <ArrowUpRight />
          </span>
        </div>
      </a>
    </article>
  );
}

export default function Work() {
  return (
    <section
      id="projects"
      className={styles.root}
      aria-labelledby="work-title"
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 id="work-title" className={styles.title}>
              <span>Selected</span>
              <span>Work</span>
            </h2>
            <p className={styles.titleIndex} aria-hidden="true">
              004
            </p>
          </div>
          <p className={styles.eyebrow}>[ portfolio ]</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.colLeft}>
            <ProjectCard project={PROJECTS[0]} slotClassName={styles.slot1} />
            <ProjectCard project={PROJECTS[1]} slotClassName={styles.slot2} />
            <div className={`${styles.cta} ${styles.slotCta}`}>
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
              <p className={styles.ctaText}>
                Discover how my creativity transforms ideas into impactful
                digital experiences &mdash; schedule a call with me to get
                started.
              </p>
              <a href="#contact" className={styles.ctaButton}>
                Let&rsquo;s talk
              </a>
            </div>
          </div>

          <div className={styles.colRight}>
            <ProjectCard project={PROJECTS[2]} slotClassName={styles.slot3} />
            <ProjectCard project={PROJECTS[3]} slotClassName={styles.slot4} />
          </div>
        </div>
      </div>
    </section>
  );
}
