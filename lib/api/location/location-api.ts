import { GetLocationsResponse } from "./location-api.types";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const getLocations = async (
  accessToken: string
): Promise<GetLocationsResponse> => {
  const url = new URL("/api/location", baseUrl);
  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  });

  if (!response.ok) return [undefined, "Error"];

  return [await response.json(), undefined];
};
