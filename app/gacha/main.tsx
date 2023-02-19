"use client";
import { CollectionProvider, useDispatchCollection } from "./useCollection";
import { Mochidex } from "./Mochidex";
import { Ticket } from "./Ticket";
import { useState } from "react";
import data from "../../public/gacha/data.json";

const Content = () => {
  const collection = useDispatchCollection();
  const [chara, setChara] = useState<(typeof data)[number]>();
  return (
    <div>
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
};

export const Main = () => {
  return (
    <CollectionProvider>
      <Content />
    </CollectionProvider>
  );
};
