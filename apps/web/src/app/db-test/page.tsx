import { sql } from '@vercel/postgres'

export default async function Page() {
	const result = await sql`SELECT * FROM feed;`

	return (
		<div>
			<h1>DB Test</h1>
			<p>Testing database connection</p>
			<pre>
				<code>{JSON.stringify(result, null, 2)}</code>
			</pre>
		</div>
	)
}
