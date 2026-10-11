import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    rootRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    const onOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutsideClick);
    return () => document.removeEventListener("pointerdown", onOutsideClick);
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="language-selector"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="language-trigger"
        aria-label={t("languageSelector.label")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      </button>
      {open && (
        <div
          id={menuId}
          className="language-dropdown"
          role="menu"
          aria-label={t("languageSelector.label")}
          onKeyDown={(event) => {
            const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
            const index = items.indexOf(document.activeElement as HTMLButtonElement);
            let next: number;
            if (event.key === "ArrowDown") next = (index + 1) % items.length;
            else if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = items.length - 1;
            else return;
            event.preventDefault();
            items[next]?.focus();
          }}
        >
          {["pt", "en"].map((language) => (
            <button
              key={language}
              type="button"
              role="menuitemradio"
              aria-checked={i18n.resolvedLanguage === language}
              onClick={() => {
                void i18n.changeLanguage(language);
                close();
              }}
            >
              {t(`languageSelector.${language}`)}
              <span aria-hidden="true">{i18n.resolvedLanguage === language ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
