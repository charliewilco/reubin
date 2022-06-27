// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  optimizeFonts: true,
  cleanDistDir: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:5300/graphql",
      },
    ];
  },
};
