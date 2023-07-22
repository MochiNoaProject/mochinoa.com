import { css } from "../../styled-system/css";
import Image from "next/image";
import Link from "next/link";

export default function TermLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header
        className={css({
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "4vw",
          paddingBlock: "8px",
          position: "sticky",
          top: 0,
          backgroundColor: "gray.50",
          shadow: "md",
        })}
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
      {children}
    </div>
  );
}
