import { deleteAsync } from 'del'
import path from 'node:path'
import { parseArgs } from 'node:util'

const turboCachePaths = []
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

if (!process.env.CI) {
	const removedPaths = await deleteAsync(
		values.all ? [...turboCachePaths, ...buildOuputPaths] : buildOuputPaths,
		{
			dryRun: values.dryrun,
		},
	)

	if (values.dryrun) {
		console.log('Would-be deleted directories:\n')
	} else {
		console.log('Deleted directories:\n')
	}

	for (const removed of removedPaths) {
		console.log('♻️ ', path.relative(process.cwd(), removed))
	}
}
