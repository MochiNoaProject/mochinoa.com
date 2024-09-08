import Image from "next/image";
import data from "../data/chibi";
import styles from "./Chibi.module.css";

interface ChibiProps {
  variant: (typeof data)[number]["name"];
  position?: "left" | "right" | "center";
}

export default function Chibi({ variant, position }: ChibiProps) {
  const chibi = data.find((item) => item.name === variant);
  if (!chibi) {
    return null;
  }
  return (
    <Image
      className={styles.root}
      data-position={position}
      src={chibi.src}
      alt={chibi.name}
      width={120}
      height={160}
    />
  );
}
