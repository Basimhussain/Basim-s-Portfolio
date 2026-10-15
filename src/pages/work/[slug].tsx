import React from "react";
import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { Navigation, SmoothScroll } from "../../components";
import Gallery from "../../components/Gallery";
import { projects, getProject, hasScreens, Project } from "../../data/projects";

interface Props {
  project: Project;
  prev: { slug: string; title: string };
  next: { slug: string; title: string };
}

const linkClass =
  "underline underline-offset-4 decoration-ink/30 hover:decoration-ink transition-colors";

const ProjectPage = ({ project, prev, next }: Props) => (
  <div className="min-h-screen bg-chalk text-ink">
    <Head>
      <title>{`${project.title} | Basim Hussain`}</title>
      <meta name="description" content={project.summary} />
    </Head>
    <SmoothScroll />
    <Navigation variant="sub" />

    <main className="mx-auto max-w-6xl px-5 md:px-8 pt-10 md:pt-16 pb-24">
      <Link href="/work" className={`text-sm text-muted ${linkClass}`}>
        All work
      </Link>

      <div className="mt-6 md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-semibold tracking-[-0.03em] leading-[1.02]">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed max-w-prose text-ink/90">
            {project.summary}
          </p>
        </div>
        <dl className="mt-8 md:mt-2 md:col-span-4 md:col-start-9 text-sm space-y-4">
          <div>
            <dt className="text-muted">Where</dt>
            <dd className="mt-0.5">{project.context}</dd>
          </div>
          <div>
            <dt className="text-muted">Built with</dt>
            <dd className="mt-0.5">{project.stack}</dd>
          </div>
          {project.links.length > 0 && (
            <div>
              <dt className="text-muted">Links</dt>
              <dd className="mt-0.5 space-y-1">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-pine ${linkClass}`}
                  >
                    {l.label}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <section className="mt-12 md:mt-16" aria-label="Gallery">
        <Gallery items={project.items} name={project.title} />
        <p className="mt-6 text-sm text-muted max-w-xl">
          {hasScreens(project)
            ? "Screens are captured from the running product. Open any image for a larger view, and use the arrow keys to move between them."
            : "This system runs inside a company, so these pages show how it works and what changed. They are overviews, not screenshots."}
        </p>
      </section>

      <nav
        aria-label="More projects"
        className="mt-20 pt-8 border-t border-line grid grid-cols-2 gap-6"
      >
        <Link href={`/work/${prev.slug}`} className="group">
          <span className="block text-sm text-muted">Previous</span>
          <span className={`mt-1 block font-medium ${linkClass}`}>{prev.title}</span>
        </Link>
        <Link href={`/work/${next.slug}`} className="group text-right">
          <span className="block text-sm text-muted">Next</span>
          <span className={`mt-1 block font-medium ${linkClass}`}>{next.title}</span>
        </Link>
      </nav>
    </main>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = getProject(params!.slug as string)!;
  const i = projects.indexOf(project);
  const pick = (p: Project) => ({ slug: p.slug, title: p.title });
  return {
    props: {
      project,
      prev: pick(projects[(i - 1 + projects.length) % projects.length]),
      next: pick(projects[(i + 1) % projects.length]),
    },
  };
};

export default ProjectPage;
