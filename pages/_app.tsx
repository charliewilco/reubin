import { AppProps } from "next/app";
import "../styles/index.css";

export default function RootApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
