import Cookies from "universal-cookie";

export const TOKEN_NAME = "REUBIN_TOKEN";

const cookies = new Cookies();

export const getToken = (): string | null => {
  let token = null;

  const value = cookies.get(TOKEN_NAME);

  if (value) {
    token = value;
  }

  return token;
};

export const setToken = (token: string) => {
  cookies.set(TOKEN_NAME, token);
};
