"use client";

import { createContext, useContext, useState } from "react";
import data from "../../public/gacha/data.json";

const COLLECTION_KEY = "mcgc";
const TICKET_KEY = "mcgc_ticket";
const TICKEY_LOG_KEY = "mcgc_ticket_log";

interface TicketLog {
  key: string;
  issuedAt: string;
}

const TicketContext = createContext<number>(0);

export const useTicket = () => {
  const context = useContext(TicketContext);

  return {
    amount: context,
  };
};

const DispatchTicketContext = createContext<{
  issue: (key: string) => void;
  isIssued: (key: string) => boolean;
}>({
  issue: () => {
    throw new Error("Not implemented");
  },
  isIssued: () => {
    throw new Error("Not implemented");
  },
});

export const useDispatchTicket = () => {
  const context = useContext(DispatchTicketContext);
  return context;
};

const shuffle = <T,>(src: T[]): T[] => {
  const dst = src.slice();
  let i = src.length;
  while (i > 0) {
    i--;
    const j = Math.floor(Math.random() * (i + 1));
    [dst[i], dst[j]] = [dst[j], dst[i]];
  }
  return dst;
};

const dataWithIndex = data.map((item, index) => ({ ...item, index }));

const CollectionContext = createContext<[number, number][]>([]);

export const useCollection = () => {
  const context = useContext(CollectionContext);
  return new Map(context);
};

const DispatchCollectionContext = createContext<{
  draw: () =>
    | {
        name: string;
        rare: number;
        description: string;
        image: string;
      }
    | false;
}>({
  draw: () => {
    throw new Error("Not implemented");
  },
});

export const useDispatchCollection = () => {
  const context = useContext(DispatchCollectionContext);
  return context;
};

interface CollectionProviderProps {
  children: React.ReactNode;
}

export const CollectionProvider = ({ children }: CollectionProviderProps) => {
  const [collection, setCollection] = useState<[number, number][]>(
    JSON.parse(localStorage.getItem(COLLECTION_KEY) ?? "[]")
  );

  const [tickets, setTickets] = useState<number>(
    parseInt(localStorage.getItem(TICKET_KEY) ?? `0`, 10)
  );

  const [ticketLogs, setTicketLogs] = useState<TicketLog[]>(
    JSON.parse(localStorage.getItem(TICKEY_LOG_KEY) ?? "[]")
  );

  return (
    <TicketContext.Provider value={tickets}>
      <DispatchTicketContext.Provider
        value={{
          isIssued: (key: string) => {
            const date = new Date();
            const issuedAt = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;

            return ticketLogs.some(
              (ticket) => ticket.key === key && ticket.issuedAt === issuedAt
            );
          },
          issue: (key) => {
            const date = new Date();

            const issuedAt = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}`;

            setTicketLogs((prev) => {
              const next = [...prev, { key, issuedAt }];
              localStorage.setItem(TICKEY_LOG_KEY, JSON.stringify(next));
              return next;
            });
            setTickets((prev) => {
              const next = prev + 10;
              localStorage.setItem(TICKET_KEY, next.toString());
              return next;
            });
          },
        }}
      >
        <CollectionContext.Provider value={collection}>
          <DispatchCollectionContext.Provider
            value={{
              draw: () => {
                let noTicket = false;
                setTickets((prev) => {
                  if (prev === 0) {
                    noTicket = true;
                    return 0;
                  }
                  const next = prev - 1;
                  localStorage.setItem(TICKET_KEY, next.toString());
                  return next;
                });

                if (noTicket) {
                  return false;
                }

                const shuffled = shuffle(dataWithIndex);

                const rate = Math.random();
                const rare = rate < 0.6 ? 3 : rate < 0.1 ? 2 : 1;
                const index = shuffled.findIndex((item) => item.rare === rare);

                const count = collection.find(([i]) => i === index)?.[1] ?? 0;
                const next: [number, number][] = [
                  ...collection.filter(([i]) => i !== index),
                  [index, count + 1],
                ];
                localStorage.setItem(COLLECTION_KEY, JSON.stringify(next));
                setCollection(next);

                return data[index];
              },
            }}
          >
            {children}
          </DispatchCollectionContext.Provider>
        </CollectionContext.Provider>
      </DispatchTicketContext.Provider>
    </TicketContext.Provider>
  );
};
