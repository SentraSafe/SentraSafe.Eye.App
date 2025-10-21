import { SeverityEnum } from "@/lib/types/shared";
import { ApiResponse } from "../shared-api.types";

export type GetLogsResponse = ApiResponse<Log[], string>;
export type GetLogsRequestParams = LogFilter;
export type SubmitHandleLogRequestBody = HandledLog;
export type SubmitHandleLogResponse = ApiResponse<undefined, string>;

export type Log = {
  id: number;
  machineId: number;
  severity: SeverityEnum;
  timeCreated: Date;
  source: string;
  message: string;
  alarmId?: number;
  handledBy?: string;
  handledAt?: string;
  handledFeedback?: string;
  isHandled?: boolean;
};

export type LogFilter = {
  machineId: number;
  timeStampFrom?: Date;
  timeStampTo?: Date;
  severity?: SeverityEnum;
  isHandled?: boolean;
  handledBy?: string;
  handledFrom?: Date;
  handledTo?: Date;
};

export type HandledLog = {
  id: number;
  handledBy: string;
  HandledFeedback: string;
};
