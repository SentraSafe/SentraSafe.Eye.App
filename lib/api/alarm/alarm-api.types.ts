import { ApiResponse } from "../shared-api.types";

export type CreateAlarmRequestBody = CreateAlarm;
export type UpdateAlarmRequestBody = Alarm;
export type HandleAlarmRequestBody = HandleAlarm;
export type GetAlarmResponse = ApiResponse<Alarm, string>;
export type GetAlarmsResponse = ApiResponse<Alarm[], string>;

export type Alarm = {
  id?: number;
  title?: string;
  description?: string;
  severity?: number;
  measurementType?: number;
  maximumValue?: number;
  machineId?: number;
};

export type HandleAlarm = {
  id?: number;
  description?: string;
  handledBy?: string;
};

export type CreateAlarm = Omit<Alarm, "id">;
