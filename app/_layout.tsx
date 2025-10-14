import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(drawer)" />
      <Stack.Screen
        name="(modals)"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
}
