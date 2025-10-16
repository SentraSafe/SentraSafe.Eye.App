import { LocationProvider } from "@/lib/hooks/contexts/location-context";
import {
  CreateMachineProvider,
  MachineFilterProvider,
} from "@/lib/hooks/contexts/machine-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LocationProvider>
      <CreateMachineProvider>
        <MachineFilterProvider>
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
        </MachineFilterProvider>
      </CreateMachineProvider>
    </LocationProvider>
  );
}
