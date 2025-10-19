export type MeasurementData = {
  readingTime: Date;
  value: number;
  measurementType: number;
  device: string;
};

export type SignalRClient<T> = {
  publish: (method: string, payload: any) => void;
  request: (method: string, payload: any) => Promise<any>;
  subscribe: (
    subscriptionEndpoint: string,
    group: string[] | string | number | null,
    callbackName: string,
    callback: (...payload: any[]) => void
  ) => Promise<T | void>;

  unsubscribe: (
    subscriptionEndpoint: string | null,
    group: string | number | null,
    callbackName: string
  ) => Promise<void>;
};

export type SeverityType = "Fejl" | "Kritisk" | "Advarsel" | "Information";

export type Severity = {
  type: SeverityType;
  value: SeverityEnum;
};

export enum SeverityEnum {
  Information = 0,
  Warning = 1,
  Error = 2,
  Critical = 3,
}

export type MeasurementType = "Temperatur" | "Luftfugtighed";

export type Measurement = {
  type: MeasurementType;
  value: number;
};
