declare module 'amadeus' {
    interface AmadeusOptions {
        clientId?: string | undefined;
        clientSecret?: string | undefined;
    }

    interface Location {
        keyword: string;
        subType: string;
        'page[limit]'?: number;
    }

    interface AmadeusResponse<T> {
        data: T[];
        meta: never;
    }

    class Locations {
        get(params: Location): Promise<AmadeusResponse<never>>;
    }

    class ReferenceData {
        locations: Locations;
    }

    class Shopping {
        flightOffersSearch: {
            get(params: never): Promise<AmadeusResponse<never>>;
        };
    }

    class Amadeus {
        constructor(options: AmadeusOptions);
        shopping: Shopping;
        referenceData: ReferenceData;
    }

    export default Amadeus;
}