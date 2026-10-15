// The mask is the whole point. The hero's photograph bleeds 30vh past its own
// section before fading into the page ground, so any section overlay that
// starts at full strength cuts a hard horizontal line straight across that
// fade. Every section wash therefore fades in over its first 150px.
const MASK = "linear-gradient(to bottom, transparent, black 150px)";

/**
 * The soft brass wash sitting behind a section's content. Position it away from
 * whichever edge carries the text, and keep the strength low: this reads as a
 * lamp somewhere off-frame, never as a coloured panel.
 */
export const SectionGlow = ({
  at,
  strength = 0.06,
}: {
  /** CSS position for the light source, e.g. "85% 30%". */
  at: string;
  /** Alpha of the brass at its centre. Above ~0.1 it stops reading as light. */
  strength?: number;
}) => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    style={{
      backgroundImage: `radial-gradient(circle at ${at}, hsl(var(--mustard) / ${strength}), transparent 55%)`,
      WebkitMaskImage: MASK,
      maskImage: MASK,
    }}
  />
);

/** The directional ground wash Studio layers under its glow. */
export const SectionWash = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-background/70 to-background"
    style={{ WebkitMaskImage: MASK, maskImage: MASK }}
  />
);
