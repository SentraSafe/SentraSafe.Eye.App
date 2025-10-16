import {
  CreateAlarmRequestBody,
  GetAlarmResponse,
  GetAlarmsResponse,
} from "./alarm-api.types";

const baseUrl = "http://10.131.9.151:6971";
const basePath = "/api/alarm";

export const getAlarms = async (
  machineId: number
): Promise<GetAlarmsResponse> => {
  const url = new URL(basePath, baseUrl);
  url.search = new URLSearchParams({
    machineId: machineId.toString(),
  }).toString();
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const getAlarm = async (id: number): Promise<GetAlarmResponse> => {
  const url = new URL(basePath, baseUrl);
  url.search = new URLSearchParams({
    id: id.toString(),
  }).toString();
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};

export const submitCreateAlarm = async (
  alarm: CreateAlarmRequestBody
): Promise<GetAlarmResponse> => {
  const url = new URL(basePath, baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(alarm),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};
