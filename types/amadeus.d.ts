declare module 'amadeus' {
    export interface AmadeusOptions {
        clientId?: string | undefined;
        clientSecret?: string | undefined;
    }

    export interface Location {
        keyword: string;
        subType: string;
        'page[limit]'?: number;
    }

    export interface AmadeusResponse<T> {
        data: T[];
        meta: never;
    }

    export class Locations {
        get(params: Location): Promise<AmadeusResponse<never>>;
    }

    export class ReferenceData {
        locations: Locations;
    }

    export class Shopping {
        flightOffersSearch: {
            get(params: {
                nonStop: boolean;
                destinationLocationCode: string;
                max: number;
                adults: number;
                originLocationCode: string;
                departureDate: string;
                travelClass: string
            }): Promise<AmadeusResponse<never>>;
        };
    }

    export default class Amadeus {
        constructor(options: AmadeusOptions);
        shopping: Shopping;
        referenceData: ReferenceData;
    }
}