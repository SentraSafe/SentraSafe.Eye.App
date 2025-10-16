export type Measurement = {
  readingTime: Date;
  value: number;
  measurementType: string;
  device: string;
};

export type SignalRClient<T> = {
  publish: (method: string, payload: any) => void;
  request: (method: string, payload: any) => Promise<any>;
  subscribe: (
    group: string | number | null,
    callbackName: string,
    callback: (...payload: any[]) => void
  ) => Promise<T> | void;

  unsubscribe: (group: string | number | null, callbackName: string) => void;
};
