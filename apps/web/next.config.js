// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		useLightningcss: true,
		ppr: true,
		reactCompiler: true,
		after: true,
	},
	webpack: (config) => {
		config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
		return config;
	},
};
