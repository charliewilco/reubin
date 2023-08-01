import { defer } from "@defer/client";

export class CronJob {
	constructor() {
		defer(this.job);
	}

	async job() {}
}
