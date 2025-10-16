import { Alarm, CreateAlarmRequestBody } from "./alarm-api.types";

const baseUrl = "http://10.131.9.151:6971/api/location";

export const getAlarms = async (machineId: number): Promise<Alarm[]> => {
  const url = new URL("getAlarms", baseUrl);
  url.search = new URLSearchParams({
    machineId: machineId.toString(),
  }).toString();
  const response = await fetch(url, { method: "GET" });

  return await response.json();
};

export const getAlarm = async (id: number): Promise<Alarm> => {
  const url = new URL("getAlarms", baseUrl);
  url.search = new URLSearchParams({
    id: id.toString(),
  }).toString();
  const response = await fetch(url, { method: "GET" });

  return await response.json();
};

export const submitCreateAlarm = async (
  alarm: CreateAlarmRequestBody
): Promise<Alarm> => {
  const url = new URL("createAlarm", baseUrl);
  const response = await fetch(url, {
    body: JSON.stringify(alarm),
    method: "POST",
  });

  return await response.json();
};
