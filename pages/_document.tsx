import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-50 dark:bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
