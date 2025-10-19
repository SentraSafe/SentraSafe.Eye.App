import { Alarm } from "@/lib/api/alarm/alarm-api.types";
import { Log } from "@/lib/api/logs/logs-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type AlarmToUpdateContext = {
  alarmToUpdate?: Alarm;
  setAlarmToUpdate: any;
};

type LogToHandleContext = {
  logToHandle?: Log;
  setLogToHandle: any;
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

const HandleLogContext = createContext<LogToHandleContext>(
  {} as LogToHandleContext
);

const HandleLogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [log, setLog] = useState<Log>();

  return (
    <HandleLogContext value={{ logToHandle: log, setLogToHandle: setLog }}>
      {children}
    </HandleLogContext>
  );
};

export {
  HandleLogContext as HandleAlarmContext,
  HandleLogProvider as HandleAlarmProvider,
  UpdateAlarmContext,
  UpdateAlarmProvider,
};
