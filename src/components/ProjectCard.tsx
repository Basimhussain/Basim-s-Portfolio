import React from "react";
import Plate, { PlateKind } from "./Plate";

interface ProjectCardProps {
  title: string;
  text: string;
  stack: string;
  meta: string;
  kind: PlateKind;
  href?: string;
  wide?: boolean;
  flip?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  text,
  stack,
  meta,
  kind,
  href,
  wide = false,
  flip = false,
}) => {
  const copy = (
    <div>
      <h3 className="text-2xl sm:text-[1.7rem] font-semibold tracking-tight leading-tight">
        {title}
      </h3>
      <p className="mt-3 text-muted leading-relaxed max-w-prose">{text}</p>
      <p className="mt-4 text-sm text-ink/80">{stack}</p>
      <p className="mt-1 text-sm text-muted">
        {meta}
        {href && (
          <>
            {" "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pine underline underline-offset-4 decoration-pine/40 hover:decoration-pine"
            >
              Visit site
            </a>
          </>
        )}
      </p>
    </div>
  );

  if (!wide) {
    return (
      <article>
        <Plate kind={kind} />
        <div className="mt-6">{copy}</div>
      </article>
    );
  }

  return (
    <article className="md:grid md:grid-cols-12 md:gap-10 md:items-center">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <Plate kind={kind} />
      </div>
      <div className={`mt-6 md:mt-0 md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        {copy}
      </div>
    </article>
  );
};

export default ProjectCard;
