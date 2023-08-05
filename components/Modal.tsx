"use client";

import { css } from "../styled-system/css";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement | null>(null);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <dialog
      ref={(node) => {
        node?.showModal();
        ref.current = node;
      }}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          rect.left > event.clientX ||
          rect.right < event.clientX ||
          rect.top > event.clientY ||
          rect.bottom < event.clientY
        ) {
          onDismiss();
        }
      }}
      className={css({
        _backdrop: {
          background: "rgba(0, 0, 0, 0.5)",
        },
        position: "fixed",
        inset: 0,
        shadow: "lg",
        margin: "auto",
        padding: 4,
        borderRadius: "8px",
        maxHeight: "90vh",
        overflow: "auto",
        zIndex: 3200,
      })}
    >
      <button
        className={css({
          float: "right",
          cursor: "pointer",
          paddingBlock: 2,
          paddingInline: 4,
          border: "1px solid",
          borderColor: "gray.200",
          transition: "background-color 0.2s",
          _hover: {
            backgroundColor: "gray.100",
          },
        })}
        type="button"
        onClick={onDismiss}
      >
        閉じる
      </button>
      <div>{children}</div>
    </dialog>
  );
}
