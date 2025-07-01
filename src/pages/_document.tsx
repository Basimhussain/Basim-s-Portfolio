import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Basim Hussain - Software Engineer specializing in Full-Stack Development, Machine Learning, and Modern Web Technologies. Explore my galaxy-themed portfolio showcasing innovative projects and technical expertise."
        />
        <meta
          name="keywords"
          content="Basim Hussain, Software Engineer, Full Stack Developer, Machine Learning, React, Next.js, TypeScript, Portfolio, MERN Stack, Python, TensorFlow"
        />
        <meta name="author" content="Basim Hussain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Basim Hussain - Software Engineer Portfolio"
        />
        <meta
          property="og:description"
          content="Explore my galaxy-themed portfolio showcasing full-stack development and machine learning projects."
        />
        <meta property="og:url" content="https://your-portfolio-domain.com" />
        <meta property="og:site_name" content="Basim Hussain Portfolio" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="Basim Hussain - Software Engineer Portfolio"
        />
        <meta
          property="twitter:description"
          content="Explore my galaxy-themed portfolio showcasing full-stack development and machine learning projects."
        />
        <meta property="twitter:creator" content="@basimhussain" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />

        {/* Theme Color */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />

        {/* Preload fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
