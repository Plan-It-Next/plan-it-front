import { DateValue, Selection } from '@nextui-org/react';

export interface travelSearchForm {
    selectedModes: Selection;
    originQuery: string;
    destQuery: string;
    originResults: Array<LocationData>;
    destResults: Array<LocationData>;
    isLoadingOrigin: boolean;
    isLoadingDest: boolean;
    departureDate: DateValue | null;
    returnDate: DateValue | null;
    travelers: number;
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
