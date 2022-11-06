import { GraphQLClient } from "graphql-request";
import type { PatchedRequestInit } from "graphql-request/dist/types";
import { AuthToken } from "./auth-token";
import { EntryFilter, getSdk, type UpdateFeedInput } from "./__generated__";

function getURL() {
	if (process.env.NODE_ENV === "test") {
		return "http://localhost:3000/v1/graphql";
	} else if (!process.env.BROWSER) {
		return "http://localhost:3000/v1/graphql";
	} else {
		return "/v1/graphql";
	}
}

export class ReubinClient extends GraphQLClient {
	private _auth = new AuthToken("REUBIN_TOKEN");
	private _sdk: ReturnType<typeof getSdk>;
	constructor() {
		super(getURL(), {
			fetch: fetch,
		});

		this._sdk = getSdk(this);
	}

	setAuthenticationHeader(token: string) {
		client.setHeader("Authorization", token);
	}

	initalizeHeaders(cb: (token: string) => void) {
		const token = this._auth.get();

		if (token !== null) {
			setHeaders(token);
			cb(token);
		}
	}

	async getEntry(id: string) {
		try {
			return this._sdk.IndividualEntry({ id });
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getFeed(id: string) {
		try {
			return this._sdk.GetFeedById({ id });
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getAllFeeds() {
		try {
			return this._sdk.GetFeeds();
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getEntriesFromFeed(id: string, filter: EntryFilter) {
		try {
			return this._sdk.EntriesByFeedFilter({ feedID: id, filter });
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getAllTags() {
		try {
			return this._sdk.AllTags();
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

let options: PatchedRequestInit = {};

if (process.env.NODE_ENV !== "test") {
	options.fetch = fetch;
}

const client = new GraphQLClient(getURL(), options);

export const setHeaders = (token: string) => {
	client.setHeader("Authorization", token);
};

export const initalizeHeaders = (cb: (token: string) => void) => {
	const token = AuthToken.new.get();

	if (token !== null) {
		setHeaders(token);
		cb(token);
	}
};

export const sdk = getSdk(client);

export const getEntry = async (id: string) => {
	try {
		return sdk.IndividualEntry({ id });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFeed = async (id: string) => {
	try {
		return sdk.GetFeedById({ id });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFeeds = async (authorization?: string) => {
	if (authorization) {
		setHeaders(authorization);
	}

	try {
		return sdk.GetFeeds();
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getEntriesFromFeed = async (feedID: string, filter?: EntryFilter) => {
	try {
		return sdk.EntriesByFeedFilter({ feedID, filter });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getAllTags = async (authorization?: string) => {
	if (authorization) {
		setHeaders(authorization);
	}

	try {
		return sdk.AllTags();
	} catch (error: any) {
		throw new Error(error);
	}
};

export const markAsRead = async (entryID: string) => {
	try {
		return sdk.MarkAsRead({ id: entryID });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addTag = async (name: string) => {
	try {
		return sdk.CreateTag({
			name,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const removeTag = async (id: string) => {
	try {
		return sdk.RemoveTag({ id });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const addFeed = async (url: string) => {
	try {
		return sdk.CreateFeed({
			url,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const refreshFeed = async (feedID: string) => {
	try {
		return sdk.RefreshFeed({ id: feedID });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const removeFeed = async (feedID: string) => {
	try {
		return sdk.RemoveFeed({
			id: feedID,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateFeedTitle = async (id: string, input?: UpdateFeedInput) => {
	try {
		return sdk.UpdateFeedTitle({
			input,
			id,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const login = async (email: string, password: string) => {
	const encoded = window.btoa(password);

	try {
		return sdk.Login({
			email,
			password: encoded,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const register = async (email: string, password: string) => {
	const encoded = window.btoa(password);

	try {
		return sdk.Register({
			email,
			password: encoded,
		});
	} catch (error: any) {
		throw new Error(error);
	}
};

export const me = async (authorization?: string) => {
	if (authorization) {
		setHeaders(authorization);
	}
	try {
		return sdk.Me();
	} catch (error: any) {
		throw new Error(error);
	}
};
