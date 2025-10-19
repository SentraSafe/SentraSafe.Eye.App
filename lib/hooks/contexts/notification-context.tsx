import { Log, LogFilter } from "@/lib/api/logs/logs-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type NotificationStore = {
  notifications: Log[];
  setNotifications: any;
};

type LogFilterStore = {
  logFilter: LogFilter;
  setLogFilter: any;
};

const NotificationContext = createContext<NotificationStore>(
  {} as NotificationStore
);

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Log[]>([]);

  return (
    <NotificationContext value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext>
  );
};

const LogFilterContext = createContext<LogFilterStore>({} as LogFilterStore);

const LogFilterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [logFilter, setLogFilter] = useState<LogFilter>({} as LogFilter);

  return (
    <LogFilterContext value={{ logFilter, setLogFilter }}>
      {children}
    </LogFilterContext>
  );
};

export {
  LogFilterContext,
  LogFilterProvider,
  NotificationContext,
  NotificationProvider,
};
