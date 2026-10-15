import "../styles/globals.css";
import "../components/InfiniteMenu.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import CursorReticle from "@/components/CursorReticle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Basim Hussain | AI Engineer, Riyadh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CursorReticle />
      <Component {...pageProps} />
    </>
  );
}
