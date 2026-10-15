import React, { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "../data/projects";

const Gallery = ({ items, name }: { items: GalleryItem[]; name: string }) => {
  const [open, setOpen] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : items[open];

  return (
    <>
      <ul className="columns-1 sm:columns-2 gap-5 [&>li]:mb-5">
        {items.map((it, i) => (
          <li key={it.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              className="group block w-full text-left"
              aria-label={`Open ${it.title}`}
            >
              <span
                className={`block overflow-hidden rounded-md bg-night ${
                  it.tall ? "aspect-[4/3]" : ""
                } ${it.phone ? "aspect-[4/5] flex items-center justify-center p-6" : ""}`}
              >
                <img
                  src={it.src}
                  width={it.w}
                  height={it.h}
                  loading="lazy"
                  alt={`${name}: ${it.title}`}
                  className={`transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                    it.tall
                      ? "w-full h-full object-cover object-top"
                      : it.phone
                      ? "h-full w-auto rounded-[1.4rem] border border-white/10"
                      : "w-full h-auto"
                  }`}
                />
              </span>
              <span className="mt-2 flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{it.title}</span>
                {it.tall && <span className="text-muted">Full page</span>}
                {it.illustration && <span className="text-muted">Overview</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} gallery`}
          className="fixed inset-0 z-50 bg-[#0a0f12] text-ivory flex flex-col"
        >
          <div className="flex items-center justify-between px-5 md:px-8 h-14 shrink-0">
            <p className="text-sm text-ivory/70 tabular-nums">
              {open! + 1} of {items.length}
            </p>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              className="text-sm px-3 py-1.5 border border-ivory/30 rounded hover:border-ivory transition-colors"
            >
              Close
            </button>
          </div>

          {/* data-lenis-prevent keeps the page smooth-scroller from eating wheel events here */}
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-auto px-4 md:px-16 flex"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <img
              src={current.src}
              alt={`${name}: ${current.title}`}
              className={`m-auto rounded-md shadow-2xl ${
                current.tall
                  ? "w-full max-w-5xl h-auto"
                  : "max-h-full max-w-full object-contain"
              }`}
            />
          </div>

          <div className="shrink-0 px-5 md:px-8 py-4 flex items-center gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="px-3 py-2 border border-ivory/30 rounded text-sm hover:border-ivory transition-colors"
              aria-label="Previous image"
            >
              Previous
            </button>
            <div className="flex-1 text-center min-w-0">
              <p className="font-medium truncate">{current.title}</p>
              <p className="text-sm text-ivory/65 truncate sm:whitespace-normal">
                {current.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              className="px-3 py-2 border border-ivory/30 rounded text-sm hover:border-ivory transition-colors"
              aria-label="Next image"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
