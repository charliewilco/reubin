import axios from "axios";

export const getFeedFromDirectURL = async (url: string) => {
  return axios.get<string>(url, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
