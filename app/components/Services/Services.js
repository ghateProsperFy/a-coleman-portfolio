import Image from "next/image";
import styles from "./Services.module.css";

const SERVICES = [
  {
    name: "Brand Discovery",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/services/01-brand-discovery.png",
  },
  {
    name: "Web design & Dev",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/services/02-web-design.png",
  },
  {
    name: "Marketing",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/services/03-marketing.png",
  },
  {
    name: "Photography",
    description:
      "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "/images/services/04-photography.png",
  },
];

export default function Services() {
  return (
    <section className={styles.root} aria-labelledby="services-title">
      <div className={styles.container}>
        <p className={styles.eyebrow}>[ services ]</p>

        <header className={styles.header}>
          <p className={styles.headerCount} aria-hidden="true">
            [4]
          </p>
          <h2 id="services-title" className={styles.headerTitle}>
            Deliverables
          </h2>
        </header>

        <ol className={styles.list}>
          {SERVICES.map((service, i) => (
            <li key={service.name} className={styles.item}>
              <div className={styles.itemHeader}>
                <p className={styles.itemIndex} aria-hidden="true">
                  [ {i + 1} ]
                </p>
                <hr className={styles.itemRule} aria-hidden="true" />
              </div>

              <div className={styles.itemBody}>
                <h3 className={styles.itemName}>{service.name}</h3>

                <div className={styles.itemDetail}>
                  <p className={styles.itemDescription}>{service.description}</p>
                  <div className={styles.itemImageWrap}>
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="151px"
                      className={styles.itemImage}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
