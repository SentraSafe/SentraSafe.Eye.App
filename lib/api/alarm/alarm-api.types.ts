import { ApiResponse } from "../shared-api.types";

export type CreateAlarmRequestBody = CreateAlarm;
export type GetAlarmResponse = ApiResponse<Alarm, string>;
export type GetAlarmsResponse = ApiResponse<Alarm[], string>;

export type Alarm = {
  id: number;
  title: string;
  description: string;
  severity: number;
  measurementType: number;
  maximumValue: number;
};

export type CreateAlarm = {
  title?: string;
  description?: string;
  severity?: number;
  measurementType?: number;
  maximumValue?: number;
  machineId: number;
};
