import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

const MachineHubContext = createContext<HubConnection | null>(null);

const AlarmHubContext = createContext<HubConnection | null>(null);

const MachineHubProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl(new URL("MachineHub", baseUrl).toString())
      .configureLogging(LogLevel.Error)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => setConnection(conn));

    return () => {};
  }, []);

  return <MachineHubContext value={connection}>{children}</MachineHubContext>;
};

const AlarmHubProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl(new URL("AlarmHub", baseUrl).toString())
      .configureLogging(LogLevel.Error)
      .withAutomaticReconnect()
      .build();

    conn.start().then(() => setConnection(conn));

    return () => {};
  }, []);

  return <AlarmHubContext value={connection}>{children}</AlarmHubContext>;
};

export {
  AlarmHubContext,
  AlarmHubProvider,
  MachineHubContext,
  MachineHubProvider,
};
