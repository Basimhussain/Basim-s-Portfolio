import { useEffect } from "react";

/**
 * Single delegated mousemove listener that updates --mx / --my
 * on any `.glow-card` element under the cursor.
 * The visual glow itself lives in CSS (.glow-card in index.css).
 */
const CardGlow = () => {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>(".glow-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
};

export default CardGlow;
