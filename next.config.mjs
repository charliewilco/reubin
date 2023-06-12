// @ts-check

/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	reactStrictMode: true,
	optimizeFonts: true,
	swcMinify: true,
	experimental: {
		serverActions: true,
	},
};