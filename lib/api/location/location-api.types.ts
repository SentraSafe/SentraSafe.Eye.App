import { ApiResponse } from "../shared-api.types";

export type GetLocationResponse = ApiResponse<Location, string>;
export type GetLocationsResponse = ApiResponse<Location[], string>;

export type Location = {
  id: number;
  name: string;
  sublocations: SubLocation[];
};

export type SubLocation = Location & {
  locationId: number;
};
