import { SignalRClient } from "@/lib/types/shared";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";

function useSignalR<T>(path: string): SignalRClient<T> {
  const connectionRef = useRef<HubConnection>(null);
  const connectPromise = useRef<Promise<void>>(null);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(new URL(path, process.env.EXPO_PUBLIC_API_URL!).toString())
      .configureLogging(LogLevel.Error)
      .withServerTimeout(120000)
      .withAutomaticReconnect()
      .build();
    connectionRef.current = connection;
    connectPromise.current = null;

    connection.onclose(() => (connectPromise.current = null));
  }, [path]);

  const ensureConnected = useCallback(async () => {
    if (connectionRef.current?.state === HubConnectionState.Connected) return;

    if (connectionRef.current?.state === HubConnectionState.Disconnected) {
      if (!connectPromise.current)
        connectPromise.current = connectionRef.current.start();

      await connectPromise.current;
      return;
    }

    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const settle = (cleanup?: () => void) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        cleanup?.();
      };

      const timeout = setTimeout(() => {
        settle();
        reject(new Error("Connection timeout"));
      }, 15000);

      const onReconnected = () => settle(() => resolve());
      const onClose = (err?: Error) => {
        settle();
        reject(err ?? new Error("Connection closed"));
      };

      connectionRef.current?.onreconnected(onReconnected);
      connectionRef.current?.onclose(onClose);

      if (
        connectionRef.current?.state === HubConnectionState.Connecting &&
        connectPromise.current
      ) {
        connectPromise.current
          .then(() => settle(() => resolve()))
          .catch((error) => {
            settle();
            reject(error);
          });
      }
    });
  }, [connectPromise]);

  const subscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string[] | string | number | null,
      callbackName: string,
      callback: (...payload: any[]) => void
    ): Promise<T | void> => {
      const client = connectionRef.current!;
      client.on(callbackName, callback);
      await ensureConnected();

      let response;
      if (subscriptionEndpoint && group) {
        response = client.invoke(subscriptionEndpoint, group);
      } else if (subscriptionEndpoint)
        response = client.invoke(subscriptionEndpoint);

      return response;
    },
    [ensureConnected]
  );

  const unsubscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string | number | null,
      callbackName: string | null
    ): Promise<void> => {
      await ensureConnected();
      const client = connectionRef.current!;
      if (group && subscriptionEndpoint)
        client.invoke(subscriptionEndpoint, group);

      if (callbackName) client.off(callbackName);
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
