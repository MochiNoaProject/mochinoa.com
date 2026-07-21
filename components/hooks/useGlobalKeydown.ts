import { useEffect } from "react";

// Deduplicate global event listeners for keyboard events

const keydownCallbacks = new Set<(e: KeyboardEvent) => void>();
let isGlobalKeydownListenerAdded = false;

function addGlobalKeydownListener() {
	if (typeof window === "undefined" || isGlobalKeydownListenerAdded) return;
	window.addEventListener("keydown", (e: KeyboardEvent) => {
		for (const cb of keydownCallbacks) {
			cb(e);
		}
	});
	isGlobalKeydownListenerAdded = true;
}

export function useGlobalKeydown(callback: (e: KeyboardEvent) => void) {
	useEffect(() => {
		addGlobalKeydownListener();
		keydownCallbacks.add(callback);
		return () => {
			keydownCallbacks.delete(callback);
		};
	}, [callback]);
}
