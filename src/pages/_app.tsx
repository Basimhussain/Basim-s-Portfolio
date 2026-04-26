import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("../components/SmoothScroll"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("../components/CustomCursor"), {
  ssr: false,
});
const GoldDust = dynamic(() => import("../components/GoldDust"), {
  ssr: false,
});
const OrbitalGuide = dynamic(() => import("../components/OrbitalGuide"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Basim Hussain — AI Software Engineer</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <SmoothScroll>
        <main className="font-sans bg-ink text-bone">
          <OrbitalGuide />
          <GoldDust />
          <Component {...pageProps} />
          <CustomCursor />
        </main>
      </SmoothScroll>
    </>
  );
}
