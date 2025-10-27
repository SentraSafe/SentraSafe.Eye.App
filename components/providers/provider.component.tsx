import { AuthenticationProvider } from "@/lib/hooks/authenitcation/authentication";
import {
  HandleAlarmProvider,
  UpdateAlarmProvider,
} from "@/lib/hooks/contexts/alarm-context";
import { LocationProvider } from "@/lib/hooks/contexts/location-context";
import {
  CreateMachineProvider,
  MachineFilterProvider,
} from "@/lib/hooks/contexts/machine-context";
import {
  LogFilterProvider,
  NotificationProvider,
} from "@/lib/hooks/contexts/notification-context";
import {
  AlarmHubProvider,
  MachineHubProvider,
} from "@/lib/hooks/contexts/signalr-client.context";
import { FC, ReactNode } from "react";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthenticationProvider>
      <AlarmHubProvider>
        <MachineHubProvider>
          <NotificationProvider>
            <LogFilterProvider>
              <LocationProvider>
                <CreateMachineProvider>
                  <MachineFilterProvider>
                    <UpdateAlarmProvider>
                      <HandleAlarmProvider>{children}</HandleAlarmProvider>
                    </UpdateAlarmProvider>
                  </MachineFilterProvider>
                </CreateMachineProvider>
              </LocationProvider>
            </LogFilterProvider>
          </NotificationProvider>
        </MachineHubProvider>
      </AlarmHubProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
