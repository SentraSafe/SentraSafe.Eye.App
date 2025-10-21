import { SignalRClient } from "@/lib/types/shared";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";

function useSignalR<T>(path: string): SignalRClient<T> {
  const connectionRef = useRef<HubConnection | null>(null);
  const connectPromise = useRef<Promise<void> | null>(null);
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    if (!baseUrl) {
      console.error("Missing EXPO_PUBLIC_API_URL; SignalR cannot initialize.");
      connectionRef.current = null;
      connectPromise.current = null;
      return;
    }
    const connection = new HubConnectionBuilder()
      .withUrl(new URL(path, baseUrl).toString())
      .configureLogging(LogLevel.Error)
      .withServerTimeout(120000)
      .withAutomaticReconnect()
      .build();
    connectionRef.current = connection;
    connectPromise.current = null;

    connection.onclose(() => (connectPromise.current = null));
  }, [path, baseUrl]);

  const ensureConnected = useCallback(async () => {
    const client = connectionRef.current;
    if (!client) {
      throw new Error("SignalR connection not initialized");
    }
    if (client.state === HubConnectionState.Connected) return;

    if (client.state === HubConnectionState.Disconnected) {
      if (!connectPromise.current)
        connectPromise.current = client.start();

      await connectPromise.current;
      return;
    }

    await new Promise<void>((resolve, reject) => {
      let settled = false;
      let active = true;
      const timeout = setTimeout(() => {
        settle();
        reject(new Error("Connection timeout"));
      }, 15000);

      const settle = (after?: () => void) => {
        if (settled) return;
        settled = true;
        active = false;
        clearTimeout(timeout);
        after?.();
      };

      const onReconnected = () => {
        if (!active) return;
        settle(() => resolve());
      };
      const onClose = (err?: Error) => {
        if (!active) return;
        settle();
        reject(err ?? new Error("Connection closed"));
      };

      // Register lifecycle handlers
      client.onreconnected(onReconnected);
      client.onclose(onClose);

      if (
        client.state === HubConnectionState.Connecting &&
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
  }, []);

  const subscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string[] | string | number | null,
      callbackName: string,
      callback: (...payload: any[]) => void
    ): Promise<T | void> => {
      if (!connectionRef.current) {
        throw new Error("SignalR connection not initialized");
      }
      const client = connectionRef.current;
      client.on(callbackName, callback);
      await ensureConnected();

      let response;
      if (subscriptionEndpoint && group) {
        response = client.invoke(subscriptionEndpoint, group);
      } else if (subscriptionEndpoint) {
        response = client.invoke(subscriptionEndpoint);
      }

      return response as any;
    },
    [ensureConnected]
  );

  const unsubscribe = useCallback(
    async (
      subscriptionEndpoint: string | null,
      group: string | number | null,
      callbackName: string | null
    ): Promise<void> => {
      await ensureConnected().catch((e) => {
        console.error(e);
      });
      if (!connectionRef.current) return;
      const client = connectionRef.current;
      if (group && subscriptionEndpoint) client.invoke(subscriptionEndpoint, group);
      if (callbackName) client.off(callbackName);
    },
    [ensureConnected]
  );

  const publish = useCallback(
    async (method: string, payload: any): Promise<void> => {
      await ensureConnected();
      if (!connectionRef.current) throw new Error("SignalR connection not initialized");
      const client = connectionRef.current;
      await client.send(method, payload);
    },
    [ensureConnected]
  );

  const request = useCallback(
    async (method: string, payload: any): Promise<any> => {
      await ensureConnected();
      if (!connectionRef.current) throw new Error("SignalR connection not initialized");
      const client = connectionRef.current;
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
