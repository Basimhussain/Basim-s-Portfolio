import React from "react";

const links = [
  { name: "Experience", href: "#experience", hideOnMobile: true },
  { name: "Projects", href: "#projects", hideOnMobile: true },
  { name: "Skills", href: "#skills", hideOnMobile: true },
  { name: "Contact", href: "#contact", hideOnMobile: false },
];

const Navigation = () => (
  <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b border-line">
    <nav
      aria-label="Main"
      className="mx-auto max-w-4xl px-5 md:px-8 h-14 flex items-center justify-between"
    >
      <a href="#top" className="font-semibold text-ink tracking-tight">
        Basim Hussain
      </a>
      <ul className="flex items-center gap-6 text-sm">
        {links.map((l) => (
          <li key={l.name} className={l.hideOnMobile ? "hidden sm:block" : ""}>
            <a
              href={l.href}
              className="text-muted hover:text-ink transition-colors"
            >
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Navigation;
