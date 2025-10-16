import { Location } from "./location-api.types";

const baseUrl = "http://10.131.9.151:6971";

export const getLocations = async (): Promise<Location[]> => {
  const url = new URL("/api/location", baseUrl);
  const response = await fetch(url, { method: "GET" });

  return await response.json();
};
