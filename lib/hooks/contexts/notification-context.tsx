import { Log, LogFilter } from "@/lib/api/logs/logs-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type NotificationStore = {
  notifications: Log[];
  setNotifications: React.Dispatch<React.SetStateAction<Log[]>>;
};

type LogFilterStore = {
  logFilter: LogFilter;
  setLogFilter: React.Dispatch<React.SetStateAction<LogFilter>>;
};

const NotificationContext = createContext<NotificationStore>({
  notifications: [],
  setNotifications: () => {},
});

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Log[]>([]);

  return (
    <NotificationContext
      value={{
        notifications: notifications,
        setNotifications: setNotifications,
      }}
    >
      {children}
    </NotificationContext>
  );
};

const LogFilterContext = createContext<LogFilterStore>({
  logFilter: {} as LogFilter,
  setLogFilter: () => {},
});

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
