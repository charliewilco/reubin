import { GraphQLClient } from "graphql-request";
import { AuthToken } from "./auth-token";
import { EntryFilter, getSdk, type UpdateFeedInput } from "./__generated__";

const ENDPOINT =
  process.env.NODE_ENV === "test" ? "http://localhost:3000/v1/graphql" : "/v1/graphql";

const client = new GraphQLClient(ENDPOINT);

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

export const getFeeds = async () => {
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

export const getAllTags = async () => {
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

export const initalizeHeaders = (cb: (token: string) => void) => {
  const token = AuthToken.manager.get();

  if (token !== null) {
    setHeaders(token);
    cb(token);
  }
};

export const setHeaders = (token: string) => {
  client.setHeader("Authorization", token);
};
