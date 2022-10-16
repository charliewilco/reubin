// @ts-check

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  optimizeFonts: true,
  cleanDistDir: true,
  swcMinify: true,
  experimental: {
    gzipSize: true,
  },
  async rewrites() {
    return [
      {
        source: "/v1/:path*",
        destination: "http://localhost:5300/:path*",
      },
    ];
  },
};

module.exports = config;
