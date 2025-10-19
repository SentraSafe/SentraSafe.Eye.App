import {
  GetLogsRequestParams,
  GetLogsResponse,
  SubmitHandleLogRequestBody,
  SubmitHandleLogResponse,
} from "./logs-api.types";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getLogs = async (
  requestParams?: GetLogsRequestParams
): Promise<GetLogsResponse> => {
  const url = new URL("/api/Log", baseUrl);
  const searchParams = new URLSearchParams({
    machineId: requestParams?.machineId.toString() ?? "",
    handledBy: requestParams?.handledBy ?? "",
    isHandled: requestParams?.isHandled?.toString() ?? "",
    severity: requestParams?.severity?.toString() ?? "",
    timeStampFrom: requestParams?.timeStampFrom?.toISOString() ?? "",
    timeStampTo: requestParams?.timeStampTo?.toISOString() ?? "",
    handleTimeFrom: requestParams?.handleTimeFrom?.toISOString() ?? "",
    handleTimeTo: requestParams?.handleTimeTo?.toISOString() ?? "",
  });
  url.search = searchParams.toString();
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const submitHandleLog = async (
  handledLog: SubmitHandleLogRequestBody
): Promise<SubmitHandleLogResponse> => {
  const url = new URL("/api/Log/HandleLog", baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(handledLog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) return [undefined, "Error"];

  return [undefined, undefined];
};
