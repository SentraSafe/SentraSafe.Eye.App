import { Alarm, HandleAlarm } from "@/lib/api/alarm/alarm-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type AlarmToUpdateContext = {
  alarmToUpdate?: Alarm;
  setAlarmToUpdate: any;
};

type AlarmToHandleContext = {
  alarmToHandle?: HandleAlarm;
  setAlarmToHandle: any;
};

const UpdateAlarmContext = createContext<AlarmToUpdateContext>(
  {} as AlarmToUpdateContext
);

const UpdateAlarmProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alarm, setAlarm] = useState<Alarm>();

  return (
    <UpdateAlarmContext
      value={{ alarmToUpdate: alarm, setAlarmToUpdate: setAlarm }}
    >
      {children}
    </UpdateAlarmContext>
  );
};

const HandleAlarmContext = createContext<AlarmToHandleContext>(
  {} as AlarmToHandleContext
);

const HandleAlarmProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [alarm, setAlarm] = useState<Alarm>();

  return (
    <HandleAlarmContext
      value={{ alarmToHandle: alarm, setAlarmToHandle: setAlarm }}
    >
      {children}
    </HandleAlarmContext>
  );
};

export {
  HandleAlarmContext,
  HandleAlarmProvider,
  UpdateAlarmContext,
  UpdateAlarmProvider,
};
