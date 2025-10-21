import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type AuthenticationStore = {
  authenticate: () => Promise<void>;
  accessToken: string;
  idToken: string;
};

const AuthenticationContext = createContext<AuthenticationStore>(
  {} as AuthenticationStore
);

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  scheme: "eye-app://redirect",
});
const issuer =
  "https://login.microsoftonline.com/2dfd1f89-3b0a-454b-9ec5-778b2f3140d5/v2.0";
const clientId = "cf989fd8-a2c2-418f-963a-c0b4c7735e49";

const AuthenticationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const discovery = AuthSession.useAutoDiscovery(issuer);
  const [request, , promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      scopes: [`openid`],
      extraParams: {},
      usePKCE: true,
    },
    discovery
  );

  const discoveryRef = useRef<AuthSession.DiscoveryDocument>(null);
  const requestRef = useRef<AuthSession.AuthRequest>(null);
  const promptRef =
    useRef<
      (
        options?: AuthSession.AuthRequestPromptOptions
      ) => Promise<AuthSession.AuthSessionResult>
    >(promptAsync);

  const resolveReadyRef = useRef<() => void>(null);

  useEffect(() => {
    discoveryRef.current = discovery;
    requestRef.current = request;
    promptRef.current = promptAsync;
    if (requestRef.current && resolveReadyRef.current)
      resolveReadyRef.current();
  }, [discovery, promptAsync, request]);

  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");

  const authenticate = async () => {
    if (!requestRef.current || !discoveryRef.current) {
      await new Promise<void>((resolve) => {
        resolveReadyRef.current = resolve;
      });
    }

    const response = await promptRef.current();
    if (response.type === "success") {
      const { code } = response.params;

      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          code: code,
          clientId: clientId,
          redirectUri: redirectUri,
          scopes: [`openid`, `api://${clientId}/.default`],

          extraParams: {
            code_verifier: requestRef.current?.codeVerifier ?? "",
          },
        },
        discoveryRef.current!
      );

      setAccessToken(tokenResponse.accessToken);
      if (tokenResponse.idToken) {
        setIdToken(tokenResponse.idToken);
      }
    }
  };

  return (
    <AuthenticationContext
      value={{
        authenticate: authenticate,
        accessToken: accessToken,
        idToken: idToken,
      }}
    >
      {children}
    </AuthenticationContext>
  );
};

export { AuthenticationContext, AuthenticationProvider };
