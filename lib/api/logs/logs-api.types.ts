import { SeverityEnum } from "@/lib/types/shared";
import { ApiResponse } from "../shared-api.types";

export type GetLogsResponse = ApiResponse<Log[], string>;
export type GetLogsRequestParams = LogFilter;
export type SubmitHandleLogRequestBody = HandledLog;
export type SubmitHandleLogResponse = ApiResponse<undefined, string>;

export type Log = {
  id: number;
  description?: string;
  timeStamp: Date;
  severity: SeverityEnum;
  machineId: number;
  alarmId: number;
  value?: string;
  isHandled: boolean;
  handledBy?: string;
  handleTime?: Date;
  handleDescription?: string;
};

export type LogFilter = {
  machineId: number;
  timeStampFrom?: Date;
  timeStampTo?: Date;
  severity?: SeverityEnum;
  isHandled?: boolean;
  handledBy?: string;
  handleTimeFrom?: Date;
  handleTimeTo?: Date;
};

export type HandledLog = {
  id: number;
  handledBy: string;
  handleDescription: string;
};
