import { AppHeader } from "../AppHeader";
import { Content } from "./Content";
import { Metadata } from "next";

const title = "話題ガチャAI";
const description = "AIが話題を決めてくれるガチャ";

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
      <AppHeader backgroundColor="#ee4444" />
      <Content />
    </div>
  );
}
