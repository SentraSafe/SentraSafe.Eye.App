import Providers from "@/components/providers/provider.component";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { Stack } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { FC, useContext, useMemo } from "react";

const Layout: FC = () => {
  const { accessToken } = useContext(AuthenticationContext);

  const token = useMemo(() => {
    if (!accessToken) return null;
    try {
      return jwtDecode(accessToken) as any;
    } catch (e) {
      console.warn("Invalid access token", e);
      return null;
    }
  }, [accessToken]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={token?.roles?.includes("Technician") ?? false}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen
          name="(modals)"
          options={{
            presentation: "transparentModal",
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />
      </Stack.Protected>
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <Providers>
      <Layout></Layout>
    </Providers>
  );
}
