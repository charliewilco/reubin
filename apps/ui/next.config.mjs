// @ts-check

/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	reactStrictMode: true,
	optimizeFonts: true,
	cleanDistDir: true,
	swcMinify: true,
	experimental: {
		gzipSize: true,
		appDir: true,
	},
	async rewrites() {
		return [
			{
				source: "/v1/:path*",
				destination: "http://localhost:4000/:path*",
			},
		];
	},
};
