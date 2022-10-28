import { proxy, useSnapshot } from "valtio";
import { useCallback, useEffect, useRef } from "react";
import { AuthToken } from "../lib/auth-token";
import { setHeaders, initalizeHeaders } from "../lib/graphql";

interface AuthState {
  token: string | null;
}

const isBrowser = typeof window !== "undefined";

export const authAtom = proxy<AuthState>({
  token: null,
});

export function useAuthAtom() {
  const initializedRef = useRef(false);
  const snapshot = useSnapshot(authAtom);
  useEffect(() => {
    if (isBrowser) {
      if (snapshot.token === null && !initializedRef.current) {
        initializedRef.current = true;
        initalizeHeaders((token) => (authAtom.token = token));
      }
    }
  }, [snapshot]);

  const loginWithToken = useCallback((token: string) => {
    setHeaders(token);
    AuthToken.manager.set(token);
    authAtom.token = token;
  }, []);

  const logout = useCallback(() => {
    setHeaders("");
    AuthToken.manager.delete();
    authAtom.token = null;
  }, []);

  return [
    snapshot,
    {
      loginWithToken,
      logout,
    },
  ] as const;
}
