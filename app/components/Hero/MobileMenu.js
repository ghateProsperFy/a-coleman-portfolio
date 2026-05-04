"use client";

import { useEffect, useState } from "react";
import styles from "./MobileMenu.module.css";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="hero-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 7h18M3 12h18M3 17h18" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="hero-mobile-menu"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <ul className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className={styles.cta} onClick={close}>
            Let&rsquo;s talk
          </a>
        </div>
      )}
    </>
  );
}
