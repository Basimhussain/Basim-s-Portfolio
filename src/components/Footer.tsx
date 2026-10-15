import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, WHATSAPP_URL, LINKEDIN_URL, GITHUB_URL } from "@/data/site";

const inputCls =
  "w-full bg-transparent border border-soft-white/10 hover:border-soft-white/20 focus:border-mustard/60 outline-none px-5 py-4 text-soft-white placeholder:text-soft-white/55 font-light rounded-lg transition-all duration-300 focus:shadow-[0_0_30px_-10px_hsl(var(--mustard)/0.4)]";

// Visible labels rather than placeholder-as-label: a placeholder disappears the
// moment someone types, so a half-filled form stops saying what its fields are.
const labelCls = "text-[11px] tracking-[0.08em] text-soft-white/70";

const Field = ({
  id,
  label,
  className = "",
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label htmlFor={id} className={labelCls}>
      {label}
    </label>
    {children}
  </div>
);

/** Hover rise text, same animation as the menu overlay buttons */
const HoverRiseText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
      {text}
    </span>
    <span
      aria-hidden
      className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
    >
      {text}
    </span>
  </span>
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`glow-card group relative overflow-hidden rounded-2xl border border-soft-white/10 bg-gradient-to-br from-soft-white/[0.05] to-soft-white/[0.01] backdrop-blur-xl transition-all duration-700 hover:border-mustard/30 hover:shadow-[0_0_70px_-20px_hsl(var(--mustard)/0.4)] ${className}`}
  >
    <div className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-soft-white/30 to-transparent" />
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--mustard)/0.08),transparent_60%)]" />
    {children}
  </div>
);

const FooterForm = () => {
  const [opened, setOpened] = useState<{ name: string; mailto: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  // The confirmation replaces the form, so focus has to follow it.
  useEffect(() => {
    if (opened) confirmRef.current?.focus();
  }, [opened]);

  // No backend: the form composes an email to me in the visitor's own mail app.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const from = String(fd.get("email") ?? "").trim();
    const topic = String(fd.get("type") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const subject = `${topic || "Hello"} from ${name || "your portfolio"}`;
    const body = `${message}\n\nName: ${name}\nEmail: ${from}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened({ name, mailto });
    window.location.href = mailto;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the address is on screen to select by hand
    }
  };

  return (
    <section id="contact" className="container pb-20 md:pb-28">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:pt-6">
          <p className="text-mustard text-[11px] tracking-luxury uppercase">Contact</p>
          <h2 className="mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95] text-soft-white">
            <span className="block">LET&apos;S</span>
            <span className="block">BUILD</span>
            <span className="block text-soft-white/40">TOGETHER.</span>
          </h2>
          <p className="mt-10 max-w-md text-soft-white/65 font-light leading-relaxed">
            Open to AI engineering roles and projects. Tell me what you are building and I will
            reply with how I would approach it.
          </p>
          <div className="mt-12 flex items-center gap-4">
            <span className="h-px w-10 bg-mustard/60" />
            <span className="text-[10px] tracking-luxury uppercase text-soft-white/50">
              Available immediately
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <GlassCard className={opened ? "is-lit" : ""}>
            {opened ? (
              <div
                ref={confirmRef}
                tabIndex={-1}
                role="status"
                className="relative p-8 md:p-10 lg:p-12 outline-none"
              >
                <div className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full bg-mustard shadow-[0_0_12px_hsl(var(--mustard))]" />
                  <p className="text-[11px] tracking-luxury uppercase text-soft-white/50">
                    Email ready
                  </p>
                </div>
                <h3 className="mt-8 font-display text-3xl md:text-4xl font-light leading-[1.1] text-soft-white">
                  Thank you{opened.name ? `, ${opened.name.split(" ")[0]}` : ""}.
                </h3>
                <p className="mt-6 max-w-md text-soft-white/70 font-light leading-relaxed">
                  Your email app should have opened with the message ready to send. If nothing
                  opened, write to{" "}
                  <span className="text-soft-white break-words">{EMAIL}</span> directly.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={opened.mailto}
                    className="group/w inline-flex items-center gap-3 rounded-full border border-mustard/50 px-6 py-4 text-mustard text-[11px] tracking-luxury transition-all duration-500 hover:border-mustard hover:shadow-[0_0_40px_-8px_hsl(var(--mustard)/0.6)]"
                  >
                    OPEN EMAIL AGAIN
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="hover-underline text-[11px] tracking-luxury uppercase text-soft-white/60 hover:text-soft-white transition-colors duration-500"
                  >
                    {copied ? "Copied" : "Copy address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpened(null)}
                    className="hover-underline text-[11px] tracking-luxury uppercase text-soft-white/60 hover:text-soft-white transition-colors duration-500"
                  >
                    Edit message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="relative p-8 md:p-10 lg:p-12">
                <div className="mb-8">
                  <p className="text-[11px] tracking-luxury uppercase text-soft-white/50">
                    Send a message
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="footer-name" label="Full name">
                    <input id="footer-name" className={inputCls} required name="name" autoComplete="name" />
                  </Field>
                  <Field id="footer-email" label="Email address">
                    <input id="footer-email" className={inputCls} required type="email" name="email" autoComplete="email" />
                  </Field>
                  <Field id="footer-type" label="What is this about" className="sm:col-span-2">
                    <select
                      id="footer-type"
                      required
                      name="type"
                      defaultValue=""
                      className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c6a75e%22 stroke-width=%221.5%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1.25rem_center] pr-12`}
                    >
                      <option value="" disabled className="bg-background">Select a topic</option>
                      <option value="Role" className="bg-background">A role</option>
                      <option value="Project" className="bg-background">A project</option>
                      <option value="Collaboration" className="bg-background">A collaboration</option>
                      <option value="Other" className="bg-background">Something else</option>
                    </select>
                  </Field>
                  <Field id="footer-message" label="Your message" className="sm:col-span-2">
                    <textarea id="footer-message" className={`${inputCls} resize-none`} name="message" rows={5} />
                  </Field>
                </div>

                <button className="group/btn mt-8 relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-mustard/50 bg-mustard/[0.06] backdrop-blur-md px-7 py-5 text-mustard text-[11px] tracking-luxury font-body transition-all duration-500 hover:border-mustard hover:bg-mustard/[0.12] hover:shadow-[0_0_40px_-8px_hsl(var(--mustard)/0.6)]">
                  <span className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-mustard/60 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  SEND MESSAGE
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </button>
                <p className="mt-5 text-[12px] text-soft-white/50 font-light">
                  This opens an email to {EMAIL} in your mail app.
                </p>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

const nav: [string, string][] = [
  ["Home", "/"],
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["Tools", "/#tools"],
  ["Contact", "/#contact"],
];

const Footer = () => (
  <footer className="bg-background pt-20 pb-10">
    <FooterForm />
    <div className="container font-body">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0">
        <div className="lg:px-8 lg:first:pl-0 lg:border-r lg:border-soft-white/10">
          <p className="text-mustard text-[11px] tracking-luxury uppercase mb-6">Contact</p>
          <a href={`mailto:${EMAIL}`} className="group block text-soft-white text-[20px] font-light leading-tight break-all">
            <HoverRiseText text={EMAIL} />
          </a>
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="group block mt-1 text-soft-white text-[22px] font-light leading-tight">
            <HoverRiseText text={PHONE_DISPLAY} />
          </a>
          <p className="mt-10 text-soft-white/55 font-light text-[13px] leading-relaxed">
            Riyadh,
            <br />
            Kingdom of Saudi Arabia.
          </p>
        </div>

        <div className="lg:px-8 lg:border-r lg:border-soft-white/10">
          <p className="text-mustard text-[11px] tracking-luxury uppercase mb-6">Navigation</p>
          <ul className="space-y-1">
            {nav.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="group inline-block text-soft-white text-[22px] font-light leading-tight">
                  <HoverRiseText text={label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:px-8 lg:border-r lg:border-soft-white/10">
          <p className="text-mustard text-[11px] tracking-luxury uppercase mb-6">Elsewhere</p>
          <ul className="space-y-1">
            {[
              ["LinkedIn", LINKEDIN_URL],
              ["GitHub", GITHUB_URL],
              ["CV (PDF)", "/Basim_Hussain_CV.pdf"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-soft-white text-[22px] font-light leading-tight"
                >
                  <HoverRiseText text={label} />{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-8">
          <p className="text-mustard text-[11px] tracking-luxury uppercase mb-6">Connect</p>
          <p className="text-soft-white/65 font-light text-[13px] leading-relaxed mb-6 max-w-[220px]">
            For roles, projects and collaborations.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-soft-white/30 pl-4 pr-5 py-3 text-soft-white text-[13px] font-light hover:border-mustard hover:text-mustard transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.12 1.6 5.92L0 24l6.42-1.68a11.83 11.83 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.84 0-3.16-1.23-6.13-3.38-8.43zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.81 1 1.02-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.28c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.46-4.45 9.9-9.9 9.9zm5.45-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
            </svg>
            Message on WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-16 md:mt-20 overflow-hidden select-none" aria-hidden="true">
        <p className="flex justify-between font-body font-light uppercase leading-none text-soft-white text-[clamp(1.5rem,7.4vw,7rem)]">
          {"BASIM HUSSAIN".split("").map((letter, i) => (
            <span key={i}>{letter === " " ? " " : letter}</span>
          ))}
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-soft-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-luxury uppercase text-soft-white/55">
        <span>© {new Date().getFullYear()} Basim Hussain</span>
        <span>AI Engineer, Riyadh</span>
      </div>
    </div>
  </footer>
);

export default Footer;
