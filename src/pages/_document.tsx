import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Basim Hussain — AI Software Engineer in Riyadh. Building Arabic-capable AI systems, RAG pipelines, Voice AI platforms, and bilingual SaaS aligned with Saudi Vision 2030."
        />
        <meta
          name="keywords"
          content="Basim Hussain, AI Software Engineer, RAG, LLM Fine-Tuning, QLoRA, Voice AI, Arabic NLP, Saudi Vision 2030, Riyadh, React 19, Node.js, PostgreSQL"
        />
        <meta name="author" content="Basim Hussain" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Basim Hussain — AI Software Engineer" />
        <meta
          property="og:description"
          content="Architecting Arabic-capable AI systems, RAG pipelines, and bilingual SaaS from Riyadh."
        />
        <meta property="og:site_name" content="Basim Hussain" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Basim Hussain — AI Software Engineer" />
        <meta
          property="twitter:description"
          content="Architecting Arabic-capable AI systems, RAG pipelines, and bilingual SaaS from Riyadh."
        />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

        <meta name="theme-color" content="#0a0a14" />
        <meta name="msapplication-TileColor" content="#0a0a14" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-ink text-bone antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
