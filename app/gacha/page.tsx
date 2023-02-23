"use client";
import {
  CollectionProvider,
  useDispatchCollection,
  useTicket,
} from "./useCollection";

import { AppHeader } from "../AppHeader";
import { IndexModal } from "./IndexModal";
import { Result } from "./Result";
import { TicketModal } from "./TicketModal";
import { useModal } from "./useModal";
import { useState } from "react";
import data from "../../public/gacha/data.json";
import styles from "./page.module.css";

const Content = () => {
  const [Modal, open] = useModal(IndexModal);
  const ticket = useTicket();
  const collection = useDispatchCollection();
  const [chara, setChara] = useState<(typeof data)[number]>();

  const [Ticket, openTicket] = useModal(TicketModal);

  return (
    <section className={styles.container}>
      <AppHeader />
      <Ticket />
      <Modal />
      <Result chara={chara} />
      <footer className={styles.footer}>
        <button className={styles.button} onClick={open}>
          図鑑
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            const chara = collection.draw();
            if (chara !== false) {
              setChara(chara);
            } else {
              openTicket();
            }
          }}
        >
          ガチャ (残り:
          {ticket.amount > 99 ? "99" : ticket.amount})
        </button>
      </footer>
    </section>
  );
};

const Page = () => {
  return (
    <CollectionProvider>
      <Content />
    </CollectionProvider>
  );
};

export default Page;
