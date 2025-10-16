import { GetLocationsResponse } from "./location-api.types";

const baseUrl = "http://10.131.9.151:6971";

export const getLocations = async (): Promise<GetLocationsResponse> => {
  const url = new URL("/api/location", baseUrl);
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};
