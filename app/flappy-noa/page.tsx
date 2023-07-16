import { Game } from "./Game";
import { css } from "../../styled-system/css";

const title = "Flappy Noa";
const description = "Flappy Noa";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
} satisfies Metadata;

export default function Page() {
  return (
    <div>
      <header
        className={css({
          marginInline: "auto",
          marginBlock: 0,
        })}
      >
        <h1
          className={css({
            background: `url("https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png") 0% 340px`,
            paddingBlock: "1.2rem",
            paddingInline: 0,
            margin: 0,
          })}
        >
          Flappy Noa (alpha ver.)
        </h1>
      </header>

      <Game />
    </div>
  );
}
