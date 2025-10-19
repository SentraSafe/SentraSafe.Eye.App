import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { jwtDecode } from "jwt-decode";
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
  scheme: "EyeApp://redirect",
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
      scopes: ["openid"],
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
          scopes: ["openid", "profile"],

          extraParams: {
            code_verifier: requestRef.current?.codeVerifier ?? "",
          },
        },
        discoveryRef.current!
      );

      console.log("accessToken", jwtDecode(tokenResponse.accessToken));
      setAccessToken(tokenResponse.accessToken);
      if (tokenResponse.idToken) {
        console.log("idToken", jwtDecode(tokenResponse.idToken));
        setIdToken(tokenResponse.idToken);
      }

      const userInfo = await AuthSession.fetchUserInfoAsync(
        tokenResponse,
        discoveryRef.current!
      );

      console.log("userInfo", userInfo);
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
