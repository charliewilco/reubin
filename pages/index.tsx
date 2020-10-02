import Head from "next/head";
import { Footer } from "../components/footer";

const IndexPage = () => (
  <>
    <Head>
      <title>Reubin | Android Feedbin Client</title>
    </Head>
    <div className="relative bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white">
      <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <header
          id="header"
          className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28 text-center"
        >
          <img
            id="icon"
            className="mx-auto w-24 h-24 mb-8"
            src="/app-icon.png"
            alt="Round Yellow Circle"
          />
          <h1 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-100 sm:text-5xl sm:leading-none md:text-6xl">
            Reubin
          </h1>
        </header>
        <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
          <div className="text-center">
            <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-100 sm:text-2xl sm:leading-none md:text-3xl">
              RSS for Android.
              <br className="xl:hidden" />
              <span className="text-yellow-500"> Coming Soon.</span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Reubin is a Feedbin client for Android.
            </p>
            {/* <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:border-yellow-700 focus:shadow-outline-yellow transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                >
                  Get It Now
                </a>
              </div>
            </div> */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  </>
);

export default IndexPage;
