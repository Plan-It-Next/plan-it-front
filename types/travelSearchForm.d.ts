import { Selection } from "@nextui-org/react";

export type travelSearchForm = {
    selectedModes: Selection;
    originQuery: '';
    destQuery: '';
    originResults: Array<LocationData>;
    destResults: Array<LocationData>;
    isLoadingOrigin: false;
    isLoadingDest: false;
    departureDate: '';
    returnDate: '';
    travelers: 1;
}

export interface LocationData {
  name: string;
  address: {
    countryName: string;
    cityName: string;
  };
  iataCode: string;
  geoCode: {
    latitude: string;
    longitude: string;
  };
  subType: string;
}
