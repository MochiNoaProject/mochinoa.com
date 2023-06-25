import { css } from "../styled-system/css";
import Image from "next/image";
import Link from "next/link";

interface AppHeaderProps {
  backgroundColor?: string;
}

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <header
      className={css({
        paddingInline: "4vw",
        paddingBlock: "8px",
        backgroundColor: "#f8b186",
        boxShadow: "token(shadows.md)",
      })}
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      <Link href="/">
        <Image
          priority
          width={146}
          height={(146 / 400) * 155}
          src="/img/logo.png"
          alt="望月のあ Official Site"
        />
      </Link>
    </header>
  );
};
