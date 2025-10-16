export type Location = {
  id: number;
  name: string;
  sublocations: SubLocation[];
};

export type SubLocation = Location & {
  locationId: number;
};
