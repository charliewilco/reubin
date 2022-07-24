// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	optimizeFonts: true,
	cleanDistDir: true,
	swcMinify: true,
	experimental: {
		newNextLinkBehavior: true,
	},
};
