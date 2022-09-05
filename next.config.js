// @ts-check

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	optimizeFonts: true,
	cleanDistDir: true,
	swcMinify: true,
	experimental: {
		newNextLinkBehavior: true,
		gzipSize: true,
	},
};

module.exports = config;
