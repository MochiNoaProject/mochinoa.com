import { CollectionProvider } from "./useCollection";
import { Content } from "./Content";
import { Metadata } from "next";

const title = "ガチャを引く";
const description = "ガチャを引いておもちくん達をGETしよう!";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
} satisfies Metadata;

const Page = () => {
  return (
    <CollectionProvider>
      <Content />
    </CollectionProvider>
  );
};

export default Page;
