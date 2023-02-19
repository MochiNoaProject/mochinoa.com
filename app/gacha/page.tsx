"use client";
import { AppHeader } from "../AppHeader";
import { CollectionProvider, useDispatchCollection } from "./useCollection";
import { Mochidex } from "./Mochidex";
import { Ticket } from "./Ticket";
import { useState } from "react";
import data from "../../public/gacha/data.json";

function Page() {
  const collection = useDispatchCollection();
  const [chara, setChara] = useState<(typeof data)[number]>();

  return (
    <div>
      <AppHeader />
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear
      </button>
      <Mochidex />
      <Ticket />
      <button
        type="button"
        onClick={() => {
          const chara = collection.draw();
          if (chara !== false) {
            setChara(chara);
          }
        }}
      >
        ガチャを引く
      </button>
      {chara ? (
        <div>
          <h2>{chara.name}</h2>
          <img
            width={500}
            height={500}
            style={{
              objectFit: "contain",
            }}
            src={chara.image}
            alt={chara.name}
            decoding="async"
          />
        </div>
      ) : null}
    </div>
  );
}

export default () => {
  return (
    <CollectionProvider>
      <Page />
    </CollectionProvider>
  );
};
