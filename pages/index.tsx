import Head from "next/head";
import Link from "next/link";

const IndexPage = () => (
  <>
    <Head>
      <title>Reubin | Android Feedbin Client</title>
    </Head>
    <h1>Reubin</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </>
);

export default IndexPage;
