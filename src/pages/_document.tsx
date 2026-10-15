import { Html, Head, Main, NextScript } from "next/document";

const description =
  "Basim Hussain is an AI Engineer in Riyadh building LLM and voice agents, RAG pipelines and bilingual Arabic and English products.";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content="Basim Hussain" />
        <meta name="theme-color" content="#0d0d0d" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Basim Hussain | AI Engineer, Riyadh" />
        <meta property="og:description" content={description} />
        <link rel="preload" href="/fonts/cormorant-garamond-300-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/readex-pro-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
