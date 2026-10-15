import { Html, Head, Main, NextScript } from "next/document";

const description =
  "Basim Hussain is an AI Engineer in Riyadh building LLM and voice agents, RAG pipelines and bilingual Arabic and English products.";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content="Basim Hussain" />
        <meta name="theme-color" content="#eef0ee" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Basim Hussain | AI Engineer, Riyadh"
        />
        <meta property="og:description" content={description} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=Reem+Kufi:wght@500&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
