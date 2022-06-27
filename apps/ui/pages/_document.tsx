import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static displayName = "DocumentLove";
  render() {
    return (
      <Html className="h-full dark:bg-zinc-900 dark:text-white">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Spectral:wght@700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full overflow-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
