import { GraphQLClient } from "graphql-request";
import { getSdk } from "./types";

const client = new GraphQLClient("/graphql");

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

export const getEntriesFromFeed = async (feedID: string) => {
  try {
    const data = await sdk.EntriesByFeed({ id: feedID });
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
    await sdk.CreateFeed({
      url,
    });
    console.log(url);
  } catch (error: any) {
    throw new Error(error);
  }
};
