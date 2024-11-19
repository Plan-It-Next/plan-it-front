export interface BookingParams {
    origin?: string;
    destination?: string;
    departureDate?: Date;
    returnDate?: Date;
    passengers?: number;
    transportModes?: string[];
}

export interface Location {
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

export interface Flight {
    type: string;
    id: string;
    source: string;
    itineraries: Array<{
        duration: string;
        segments: Array<{
            departure: {
                iataCode: string;
                at: string;
            };
            arrival: {
                iataCode: string;
                at: string;
            };
            carrierCode: string;
            number: string;
        }>;
    }>;
    price: {
        currency: string;
        total: string;
    };
}