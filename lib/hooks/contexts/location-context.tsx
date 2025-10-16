import { Location } from "@/lib/api/location/location-api.types";
import { createContext, FC, ReactNode, useState } from "react";

type Context = {
  locations: Location[];
  setLocations: any;
};

const LocationContext = createContext<Context>({} as Context);

const LocationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <LocationContext
      value={{ locations: locations, setLocations: setLocations }}
    >
      {children}
    </LocationContext>
  );
};

export { LocationContext, LocationProvider };
