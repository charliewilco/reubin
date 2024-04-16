// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		useLightningcss: true,
	},
	webpack: (config) => {
		config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
		return config
	},
}
