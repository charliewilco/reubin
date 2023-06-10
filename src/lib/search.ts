import { type Orama, create, search } from "@orama/orama";

export class EntrySearch {
	db: Orama<any> | null = null;
	constructor() {}

	async initialize() {
		this.db = await create({
			schema: {},
		});
	}
	async search(query: string) {
		if (this.db === null) throw new Error("Database not initialized");
		return search(this.db, {
			term: query,
		});
	}
}
