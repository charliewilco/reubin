import { $, Glob } from 'bun'
import path from 'node:path'
import { parseArgs } from 'node:util'

const rmrf = (path: string) => $`rm -rf ${path}`

const turboCachePaths = ['.turbo']
const buildOuputPaths = [
	'.husky',
	'.next',
	'coverage',
	'tsconfig.tsbuildinfo',
	'e2e/playwright-report',
	'*/**/.DS_Store',
	'.DS_Store',
]

const { values } = parseArgs({
	args: Bun.argv,
	allowPositionals: true,
	options: {
		all: {
			type: 'boolean',
			short: 'a',
		},
		dryrun: {
			type: 'boolean',
			short: 'd',
		},
	},
})

const removedPaths: string[] = []

const globs = [...buildOuputPaths, ...turboCachePaths].map((paths) => new Glob(paths))

const files = globs.flatMap((g) => [...g.scanSync()])

console.log(files)

if (!process.env.CI) {
	if (values.dryrun) {
		removedPaths.push(...files)
	}

	if (!values.dryrun) {
		await Promise.all(files.map((file) => rmrf(file).then(() => removedPaths.push(file))))
	}

	if (values.dryrun) {
		console.log('Would-be deleted directories:\n')
	} else {
		console.log('Deleted directories:\n')
	}

	for (const removed of removedPaths) {
		console.log('♻️ ', '\x1b[1m\x1b[32m%s\x1b[0m', path.relative(process.cwd(), removed))
	}
}
