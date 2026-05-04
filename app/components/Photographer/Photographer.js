import Image from "next/image";
import styles from "./Photographer.module.css";

export default function Photographer() {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/photographer/portrait.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>
    </div>
  );
}
