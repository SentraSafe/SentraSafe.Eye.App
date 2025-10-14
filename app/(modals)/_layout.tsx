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
        header: () => (
          <PageHeader onPress={router.dismiss} iconType="close"></PageHeader>
        ),
      }}
    ></Stack>
  );
}
