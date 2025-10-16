import PageHeader from "@/components/page-header/page-header.component";
import { Stack, useRouter } from "expo-router";

export default function ModalLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: "transparentModal",
        gestureDirection: "vertical",
        fullScreenGestureEnabled: true,
        animationMatchesGesture: true,
        contentStyle: {
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        },
        header: ({ options }) => (
          <PageHeader onPress={router.dismiss} iconType="close">
            {options.title}
          </PageHeader>
        ),
      }}
    >
      <Stack.Screen
        name="machine/machine-filter"
        options={{ title: "Maskine filtre" }}
      />
      <Stack.Screen
        name="machine/add-machine"
        options={{ title: "Tilføj maskine" }}
      />
    </Stack>
  );
}
