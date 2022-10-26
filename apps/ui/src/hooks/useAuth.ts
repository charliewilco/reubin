import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { AuthToken } from "../lib/auth-token";
import { setHeaders, initalizeHeaders } from "../lib/graphql";

interface AuthState {
  token: string | null;
}

const isBrowser = typeof window !== "undefined";

export const authAtom = atom<AuthState>({
  token: null,
});

export function useAuthAtom() {
  const initializedRef = useRef(false);
  const [state, setState] = useAtom(authAtom);
  useEffect(() => {
    if (isBrowser) {
      if (state.token === null && !initializedRef.current) {
        initializedRef.current = true;
        initalizeHeaders((token) => setState({ token }));
      }
    }
  }, [state, setState]);

  const loginWithToken = useCallback(
    (token: string) => {
      setHeaders(token);
      AuthToken.manager.set(token);
      setState({ token });
    },
    [setState]
  );
  const logout = useCallback(() => {
    setHeaders("");
    AuthToken.manager.delete();
    setState({ token: null });
  }, [setState]);
  return [
    state,
    setState,
    {
      loginWithToken,
      logout,
    },
  ] as const;
}
