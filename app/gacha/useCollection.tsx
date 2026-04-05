"use client";

import { createContext, useContext, useEffect, useState } from "react";
import data from "../../public/gacha/data.json";

const COLLECTION_KEY = "mcgc:v1";
const TICKET_KEY = "mcgc_ticket:v1";
const TICKEY_LOG_KEY = "mcgc_ticket_log:v1";

const storageCache = new Map<string, unknown>();

function loadFromStorage<T>(key: string, defaultValue: T): T {
	if (storageCache.has(key)) {
		return storageCache.get(key) as T;
	}
	try {
		const stored = localStorage.getItem(key);
		if (stored) {
			const parsed = JSON.parse(stored) as T;
			storageCache.set(key, parsed);
			return parsed;
		}
	} catch {
		// Ignore errors in incognito mode or when disabled
	}
	storageCache.set(key, defaultValue);
	return defaultValue;
}

function saveToStorage<T>(key: string, value: T) {
	storageCache.set(key, value);
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Ignore errors if quota exceeded or disabled
	}
}

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
	const [collection, setCollection] = useState<[number, number][]>([]);

	const [tickets, setTickets] = useState<number>(0);

	const [ticketLogs, setTicketLogs] = useState<TicketLog[]>([]);

	useEffect(() => {
		// Try to migrate old unversioned data first
		try {
			const oldTicketsStr = localStorage.getItem("mcgc_ticket");
			if (oldTicketsStr) {
				const oldTickets = Number.parseInt(oldTicketsStr, 10);
				if (!Number.isNaN(oldTickets)) {
					saveToStorage(TICKET_KEY, oldTickets);
				}
				localStorage.removeItem("mcgc_ticket");
			}

			const oldCollectionStr = localStorage.getItem("mcgc");
			if (oldCollectionStr) {
				const oldCollection = JSON.parse(oldCollectionStr);
				saveToStorage(COLLECTION_KEY, oldCollection);
				localStorage.removeItem("mcgc");
			}

			const oldLogsStr = localStorage.getItem("mcgc_ticket_log");
			if (oldLogsStr) {
				const oldLogs = JSON.parse(oldLogsStr);
				saveToStorage(TICKEY_LOG_KEY, oldLogs);
				localStorage.removeItem("mcgc_ticket_log");
			}
		} catch {
			// Ignore migration errors
		}

		setCollection(loadFromStorage<[number, number][]>(COLLECTION_KEY, []));
		setTickets(loadFromStorage<number>(TICKET_KEY, 0));
		setTicketLogs(loadFromStorage<TicketLog[]>(TICKEY_LOG_KEY, []));
	}, []);

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
							(ticket) => ticket.key === key && ticket.issuedAt === issuedAt,
						);
					},
					issue: (key) => {
						const date = new Date();

						const issuedAt = `${date.getFullYear()}-${
							date.getMonth() + 1
						}-${date.getDate()}`;

						setTicketLogs((prev) => {
							const next = [...prev, { key, issuedAt }];
							saveToStorage(TICKEY_LOG_KEY, next);
							return next;
						});
						setTickets((prev) => {
							const next = prev + 10;
							saveToStorage(TICKET_KEY, next);
							return next;
						});
					},
				}}
			>
				<CollectionContext.Provider value={collection}>
					<DispatchCollectionContext.Provider
						value={{
							draw: () => {
								if (tickets === 0) {
									return false;
								}

								setTickets((prev) => {
									const next = prev ? prev - 1 : 0;
									saveToStorage(TICKET_KEY, next);
									return next;
								});

								const shuffled = shuffle(dataWithIndex);

								const rate = Math.random();
								const rare = rate < 0.6 ? 3 : rate < 0.1 ? 2 : 1;
								const index = shuffled.findIndex((item) => item.rare === rare);

								const count = collection.find(([i]) => i === index)?.[1] ?? 0;
								const next: [number, number][] = [
									...collection.filter(([i]) => i !== index),
									[index, count + 1],
								];
								saveToStorage(COLLECTION_KEY, next);
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
