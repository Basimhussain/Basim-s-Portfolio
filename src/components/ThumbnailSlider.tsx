import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  gallery: string[];
  title: string;
  activeIndex: number;
  onSelect: (i: number) => void;
  onZoom: (i: number) => void;
};

const ThumbnailSlider = ({ gallery, title, activeIndex, onSelect, onZoom }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons, gallery.length]);

  const slide = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="relative mt-3 md:mt-4">
      <div
        ref={scrollerRef}
        className="flex gap-2 md:gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {gallery.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            onDoubleClick={() => onZoom(i)}
            aria-label={`View image ${i + 1}`}
            className={`snap-start shrink-0 relative overflow-hidden bg-secondary aspect-[4/3] w-[calc((100%-1.5rem)/4)] md:w-[calc((100%-3.75rem)/6)] transition-all duration-500 ${
              i === activeIndex ? "ring-2 ring-mustard opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt={`${title} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => slide(-1)}
        aria-label="Previous thumbnails"
        disabled={!canPrev}
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-soft-white hover:text-mustard hover:border-mustard transition-all duration-300 ${
          canPrev ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => slide(1)}
        aria-label="Next thumbnails"
        disabled={!canNext}
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur border border-border text-soft-white hover:text-mustard hover:border-mustard transition-all duration-300 ${
          canNext ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ThumbnailSlider;
