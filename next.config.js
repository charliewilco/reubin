// @ts-check

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	optimizeFonts: true,
	cleanDistDir: true,
	swcMinify: true,
	experimental: {
		newNextLinkBehavior: true,
	},
};

module.exports = config;
