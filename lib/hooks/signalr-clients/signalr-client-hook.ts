import { SignalRClient } from "@/lib/types/shared";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef } from "react";

function useSignalR<T>(path: string): SignalRClient<T> {
  const connectionRef = useRef<HubConnection>(null);
  const connectPromise = useRef<Promise<void>>(null);

  const disconnect = () => {
    console.log("stopping");
    connectionRef.current?.stop();
  };

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(new URL(path, process.env.EXPO_PUBLIC_API_URL!).toString())
      .configureLogging(LogLevel.Debug)
      .withAutomaticReconnect()
      .build();
    connectionRef.current = connection;

    const connect = async () => {
      try {
        await connection.start();
      } catch (error) {
        console.error(error);
      }
    };

    console.log("connecting");

    if (!connectPromise.current) connectPromise.current = connect();

    return disconnect;
  }, [path]);

  useFocusEffect(useCallback(() => disconnect, []));

  const ensureConnected = useCallback(async () => {
    if (connectionRef.current?.state === HubConnectionState.Connected) return;

    if (connectionRef.current?.state === HubConnectionState.Disconnected) {
      await connectionRef.current.start();
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Connection timeout")),
        15000
      );
      const cleanUp = () => {
        clearTimeout(timeout);
        resolve();
      };
      if (connectionRef.current?.state === HubConnectionState.Connecting)
        connectPromise.current?.then(() => cleanUp());
      else if (connectionRef.current?.state === HubConnectionState.Reconnecting)
        connectionRef.current?.onreconnected(cleanUp);
      else cleanUp();
    });
  }, [connectPromise]);

  const subscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string[] | string | number | null,
      callbackName: string,
      callback: (...payload: any[]) => void
    ): Promise<T | void> => {
      await ensureConnected();
      const client = connectionRef.current!;

      let response;
      if (group && subscriptionEndpoint) {
        response = client.invoke(subscriptionEndpoint, group);
      }

      client.on(callbackName, callback);

      return response;
    },
    [ensureConnected]
  );

  const unsubscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string | number | null,
      callbackName: string
    ): Promise<void> => {
      await ensureConnected();
      const client = connectionRef.current!;
      if (group && subscriptionEndpoint)
        client.invoke(subscriptionEndpoint, group);
      client.off(callbackName);
    },
    [ensureConnected]
  );

  const publish = useCallback(
    async (method: string, payload: any): Promise<void> => {
      await ensureConnected();
      const client = connectionRef.current!;
      client.send(method, payload);
    },
    [ensureConnected]
  );

  const request = useCallback(
    async (method: string, payload: any): Promise<any> => {
      await ensureConnected();
      const client = connectionRef.current!;
      return client.invoke(method, payload);
    },
    [ensureConnected]
  );

  return {
    publish: publish,
    request: request,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };
}

export default useSignalR;
