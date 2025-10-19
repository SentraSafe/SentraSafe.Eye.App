import { SeverityEnum } from "@/lib/types/shared";
import { ApiResponse } from "../shared-api.types";

export type CreateAlarmRequestBody = CreateAlarm;
export type UpdateAlarmRequestBody = Alarm;
export type GetAlarmResponse = ApiResponse<Alarm, string>;
export type GetAlarmsResponse = ApiResponse<Alarm[], string>;

export type Alarm = {
  id?: number;
  title?: string;
  description?: string;
  severity?: SeverityEnum;
  valueType?: number;
  maximumValue?: number;
  machineId?: number;
};

export type CreateAlarm = Omit<Alarm, "id">;
