import React, { useEffect, useRef } from "react";

export type PlateKind =
  | "agents"
  | "estimator"
  | "erp"
  | "voice"
  | "sentiment"
  | "scentwell";

// Every figure on a plate comes from the CV. Nothing here is sample data.

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-ivory/65">{children}</p>
);

const Bar = ({
  pct,
  delay = 0,
  brass = false,
}: {
  pct: number;
  delay?: number;
  brass?: boolean;
}) => (
  <div className="h-2.5 rounded-sm bg-ivory/15">
    <div
      className={`bar h-full rounded-sm ${brass ? "bg-brass" : "bg-ivory/70"}`}
      style={{
        width: `${pct}%`,
        minWidth: 6,
        ["--d" as string]: `${delay}s`,
      }}
    />
  </div>
);

const Row = ({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex justify-between text-sm text-ivory/85 mb-1.5">
      <span>{name}</span>
      <span className="tabular-nums">{value}</span>
    </div>
    {children}
  </div>
);

const Big = ({ children }: { children: React.ReactNode }) => (
  <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-brass leading-none">
    {children}
  </span>
);

const wave = Array.from({ length: 46 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 0.52) * Math.cos(i * 0.19));
  return 12 + Math.round(v * 78);
});

const body: Record<PlateKind, () => React.ReactNode> = {
  agents: () => (
    <>
      <div className="space-y-4">
        <Label>Time to first reply</Label>
        <Row name="Before" value="about 4 hours">
          <Bar pct={100} />
        </Row>
        <Row name="After" value="under 30 seconds">
          <Bar pct={0.4} brass delay={0.5} />
        </Row>
      </div>
      <div className="space-y-3">
        <Label>First-contact enquiries that no longer reach sales</Label>
        <div className="flex items-center gap-5">
          <Big>~70%</Big>
          <div className="flex-1 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="h-7 rounded-sm bg-ivory/15 overflow-hidden">
                {i < 7 && (
                  <div
                    className="bar h-full bg-brass"
                    style={{ ["--d" as string]: `${0.4 + i * 0.07}s` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ),

  estimator: () => (
    <>
      <div className="flex gap-2 text-sm">
        <span className="px-3 py-1 rounded-sm bg-ivory text-night font-arabic">
          العربية
        </span>
        <span className="px-3 py-1 rounded-sm border border-ivory/30 text-ivory/80">
          English
        </span>
      </div>
      <div className="space-y-3">
        <Big>&lt; 2 s</Big>
        <Label>from request to quote, in either language</Label>
      </div>
      <Label>Live on bocsmart.com</Label>
    </>
  ),

  erp: () => (
    <>
      <div className="grid grid-cols-3 gap-2">
        {["HR", "Finance", "Procurement", "Projects", "Field operations"].map(
          (m) => (
            <div
              key={m}
              className="border border-ivory/25 rounded-sm px-2.5 sm:px-3 py-4 text-sm text-ivory/90"
            >
              {m}
            </div>
          )
        )}
        <div className="border border-brass rounded-sm px-2.5 sm:px-3 py-4 text-sm text-brass">
          3 active sites
        </div>
      </div>
      <Label>Role-based access, multi-stage approvals, live dashboards</Label>
    </>
  ),

  voice: () => (
    <>
      <div
        className="wave flex items-end gap-[3px] h-24"
        aria-hidden="true"
      >
        {wave.map((h, i) => (
          <i
            key={i}
            className={`flex-1 rounded-[1px] ${
              i % 9 === 4 ? "bg-brass" : "bg-ivory/55"
            }`}
            style={{ height: `${h}%`, ["--d" as string]: `${i * 0.018}s` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <Big>100K+</Big>
          <Label>calls a day, the design target</Label>
        </div>
        <div className="text-sm text-ivory/85 space-y-1 tabular-nums">
          <p>Faithfulness 0.93</p>
          <p>Answer relevancy 0.90</p>
        </div>
      </div>
    </>
  ),

  sentiment: () => (
    <>
      <div className="space-y-4">
        <Label>Three-class F1 on Arabic tweets</Label>
        <Row name="Base Llama 3 8B" value="0.58">
          <Bar pct={58} />
        </Row>
        <Row name="After QLoRA fine-tune" value="0.87">
          <Bar pct={87} brass delay={0.4} />
        </Row>
      </div>
      <div className="flex gap-8 text-sm text-ivory/85">
        <p>12K training tweets</p>
        <p>14 tracked runs</p>
      </div>
    </>
  ),

  scentwell: () => (
    <>
      <div className="space-y-4">
        <Label>Evaluated with RAGAS</Label>
        <Row name="Faithfulness" value="0.90">
          <Bar pct={90} brass />
        </Row>
        <Row name="Answer relevancy" value="0.88">
          <Bar pct={88} brass delay={0.3} />
        </Row>
      </div>
      <div className="flex items-end gap-4">
        <Big>35%</Big>
        <Label>fewer hallucinations</Label>
      </div>
    </>
  ),
};

const tone: Record<PlateKind, string> = {
  agents: "bg-pine",
  estimator: "bg-night",
  erp: "bg-pine",
  voice: "bg-night",
  sentiment: "bg-pine",
  scentwell: "bg-night",
};

const Plate = ({ kind }: { kind: PlateKind }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "1";
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${tone[kind]} rounded-md p-6 sm:p-8 min-h-[18rem] flex flex-col justify-between gap-8`}
    >
      {body[kind]()}
    </div>
  );
};

export default Plate;
