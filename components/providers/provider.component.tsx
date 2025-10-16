import {
  HandleAlarmProvider,
  UpdateAlarmProvider,
} from "@/lib/hooks/contexts/alarm-context";
import { LocationProvider } from "@/lib/hooks/contexts/location-context";
import {
  CreateMachineProvider,
  MachineFilterProvider,
} from "@/lib/hooks/contexts/machine-context";
import { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LocationProvider>
      <CreateMachineProvider>
        <MachineFilterProvider>
          <UpdateAlarmProvider>
            <HandleAlarmProvider>{children}</HandleAlarmProvider>
          </UpdateAlarmProvider>
        </MachineFilterProvider>
      </CreateMachineProvider>
    </LocationProvider>
  );
};

export default Providers;
