export type MeasurementData = {
  readingTime: Date;
  value: number;
  measurementType: MeasurementEnum;
  device: string;
};

export type SignalRClient<T> = {
  publish: (method: string, payload: any) => void;
  request: (method: string, payload: any) => Promise<any>;
  subscribe: (
    subscriptionEndpoint: string | null,
    group: string[] | string | number | null,
    callbackName: string,
    callback: (...payload: any[]) => void
  ) => Promise<T | void>;

  unsubscribe: (
    subscriptionEndpoint: string | null,
    group: string | number | null,
    callbackName: string | null
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

export type MeasurementType =
  | "Temperatur"
  | "Luftfugtighed"
  | "Ram"
  | "Cpu"
  | "Disk";

export type Measurement = {
  type: MeasurementType;
  value: MeasurementEnum;
};

export type Machine = {
  type: MachineType;
  value: MachineEnum;
};

export type MachineType =
  | "Server"
  | "ConveyorSystem"
  | "ChemicalMixer"
  | "Other";

export enum MeasurementEnum {
  Temperature = 0,
  Humidity = 1,
  RamUsage = 2,
  CpuUsage = 3,
  DiskSpaceUsed = 4,
  UpTime = 5,
}

export enum MachineEnum {
  Server = 0,
  ConveyorSystem = 1,
  ChemicalMixer = 2,
  Other = 3,
}
