export const FEEDBIN_API = "https://api.feedbin.com/v2";
export const SUBSCRIPTIONS_URL = FEEDBIN_API.concat("/subscriptions.json");
export const TAGGINGS_URL = FEEDBIN_API.concat("/taggings.json");
export const AUTHENTICATE_URL = FEEDBIN_API.concat("/authentication.json");
export const UNREAD_URL = FEEDBIN_API.concat("/unread_entries.json");
export const ENTRIES_URL = FEEDBIN_API.concat("/entries.json");
export const createEntryURL = (id: number) =>
  FEEDBIN_API.concat(`/entries/${id}.json`);
