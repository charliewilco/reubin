import { GraphQLClient } from "graphql-request";
import { EntryFilter, getSdk } from "./types";

const client = new GraphQLClient("/v1/graphql");

export const sdk = getSdk(client);

export const getEntry = async (id: string) => {
  try {
    const data = await sdk.IndividualEntry({ id });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFeeds = async () => {
  try {
    const data = await sdk.GetFeeds();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEntriesFromFeed = async (feedID: string, filter?: EntryFilter) => {
  try {
    const data = await sdk.EntriesByFeedFilter({ feedID, filter });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const markAsRead = async (entryID: string) => {
  try {
    const data = await sdk.MarkAsRead({ id: entryID });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addFeed = async (url: string) => {
  try {
    const data = await sdk.CreateFeed({
      url,
    });
    return data;
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

export const updateFeedTitle = async (title: string, id: string) => {
  try {
    return sdk.UpdateFeedTitle({
      title,
      id,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
