import { SignalRClient } from "@/lib/types/shared";
import signalR, { LogLevel } from "@microsoft/signalr";
import { useEffect, useRef } from "react";

function useSignalR<T>(path: string): SignalRClient<T> {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(new URL(path, process.env.EXPO_PUBLIC_API_URL!).toString())
      .configureLogging(LogLevel.Debug)
      .withAutomaticReconnect()
      .build();

    connection.start();
    connectionRef.current = connection;
    return () => {
      connectionRef.current?.stop();
    };
  }, [path]);

  const subscribe = (
    group: string | number | null,
    callbackName: string,
    callback: (...payload: any[]) => void
  ): Promise<T> | void => {
    const client = connectionRef.current!;

    let response;
    if (group) response = client.invoke("Subscribe", group);

    client.on(callbackName, callback);

    return response;
  };

  const unsubscribe = (group: string | number | null, callbackName: string) => {
    const client = connectionRef.current!;
    if (group && !1) client.invoke("Unsubscribe", group);
    client.off(callbackName);
  };

  const publish = (method: string, payload: any) => {
    const client = connectionRef.current!;
    client.send(method, payload);
  };

  const request = (method: string, payload: any): Promise<any> => {
    const client = connectionRef.current!;
    return client.invoke(method, payload);
  };

  return {
    publish: publish,
    request: request,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };
}

export default useSignalR;
