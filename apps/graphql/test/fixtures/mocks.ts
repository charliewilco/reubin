import base64 from "base-64";
import cuid from "@paralleldrive/cuid2";

export class TestingMocks {
	user: { email: string; password: string };

	private _mocks = new Map<string, string | null>();
	private _entryCount = 0;
	private _lastFetched = new Date();

	constructor() {
		this.user = {
			email: `test-${cuid.createId()}@charlieisamazing.com`,
			password: base64.encode("P@ssw0rd"),
		};
	}

	get entryCount() {
		return this._entryCount;
	}

	get lastFetched() {
		return this._lastFetched;
	}

	get authToken() {
		return this._mocks.get("authToken") ?? null;
	}

	get currentEntry() {
		return this._mocks.get("currentEntry") ?? null;
	}

	get currentFeed() {
		return this._mocks.get("currentFeed") ?? null;
	}

	get currentTag() {
		return this._mocks.get("currentTag") ?? null;
	}

	set entryCount(value: number) {
		this._entryCount = value;
	}

	set lastFetched(value: Date) {
		this._lastFetched = value;
	}

	set authToken(value: string | null) {
		this._mocks.set("authToken", value);
	}

	set currentEntry(value: string | null) {
		this._mocks.set("currentEntry", value);
	}

	set currentFeed(value: string | null) {
		this._mocks.set("currentFeed", value);
	}
	set currentTag(value: string | null) {
		this._mocks.set("currentTag", value);
	}

	clearAll() {
		this._mocks.clear();
	}
}
