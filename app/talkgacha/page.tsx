import { AppHeader } from "../AppHeader";
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
      <AppHeader />
      <div>Hello, World</div>
    </div>
  );
}
