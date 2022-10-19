import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { setToken } from "../lib/cookies";
import { setHeaders, initalizeHeaders } from "../lib/graphql";

interface AuthState {
  token: string | null;
}

const isBrowser = typeof window !== "undefined";

const authAtom = atom<AuthState>({
  token: null,
});

export function useAuthAtom() {
  const initializedRef = useRef(false);
  const [state, setState] = useAtom(authAtom);
  useEffect(() => {
    if (isBrowser) {
      if (state.token !== null && initializedRef.current) {
        setHeaders(state.token);
        setToken(state.token);
      } else {
        initializedRef.current = true;
        initalizeHeaders((token) => setState({ token }));
      }
    }
  }, [state, setState]);
  return [state, setState] as const;
}
