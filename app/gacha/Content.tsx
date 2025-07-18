"use client";
import { useEffect, useState } from "react";
import data from "../../public/gacha/data.json";
import { AppHeader } from "../AppHeader";
import { IndexModal } from "./IndexModal";
import styles from "./page.module.css";
import { Result } from "./Result";
import { TicketModal } from "./TicketModal";
import { useDispatchCollection, useTicket } from "./useCollection";
import { useModal } from "./useModal";

export const Content = () => {
	const [Modal, open] = useModal(IndexModal);
	const ticket = useTicket();
	const collection = useDispatchCollection();
	const [chara, setChara] = useState<(typeof data)[number]>();

	const [Ticket, openTicket] = useModal(TicketModal);

	useEffect(() => {
		const preloadImage = (url: string) => {
			const img = new Image();
			img.src = url;
		};
		for (const chara of data) {
			preloadImage(chara.image);
		}
	}, []);

	return (
		<section className={styles.container}>
			<AppHeader />
			<Ticket />
			<Modal />
			<Result chara={chara} key={ticket.amount} />
			<footer className={styles.footer}>
				<button className={styles.button} type="button" onClick={open}>
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
					{ticket.amount === 0 ? (
						<span>ガチャチケをGET</span>
					) : (
						<span>
							ガチャ (残り:
							{ticket.amount > 99 ? "99" : ticket.amount})
						</span>
					)}
				</button>
			</footer>
		</section>
	);
};
