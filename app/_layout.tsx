import Providers from "@/components/providers/provider.component";
import { AuthenticationContext } from "@/lib/hooks/authenitcation/authentication";
import { Stack } from "expo-router";
import { FC, use } from "react";

const Layout: FC = () => {
  const { accessToken } = use(AuthenticationContext);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!accessToken}>
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
