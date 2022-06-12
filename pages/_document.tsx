import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static displayName = "DocumentLove";
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="dark:bg-zinc-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
