import {amadeusAuthService} from "@/services/amadeus/AmadeusAuthService";

interface Airport {
    name: string;
    iataCode: string;
    address: {
        cityName: string;
        countryName: string;
    };
    distance: {
        value: number;
        unit: string;
    };
}

interface AirportSearchParams {
    latitude: number;
    longitude: number;
    radius?: number;
    pageLimit?: number;
    pageOffset?: number;
    sort?: string;
}

export class AmadeusFlightService {
    private readonly baseUrl = 'https://test.api.amadeus.com';

    // ... existing methods ...

    async searchNearbyAirports(params: AirportSearchParams): Promise<Airport[]> {
        try {
            const token = await amadeusAuthService.getAccessToken();

            const queryParams = new URLSearchParams({
                latitude: params.latitude.toString(),
                longitude: params.longitude.toString(),
                radius: (params.radius || 500).toString(),
                'page[limit]': (params.pageLimit || 10).toString(),
                'page[offset]': (params.pageOffset || 0).toString(),
                sort: params.sort || 'relevance'
            });

            const response = await fetch(
                `${this.baseUrl}/v1/reference-data/locations/airports?${queryParams}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Airport search failed with status: ${response.status}`);
            }

            const data = await response.json();
            return data.data.slice(0, 5).map((airport: any) => ({
                name: airport.name,
                iataCode: airport.iataCode,
                address: {
                    cityName: airport.address.cityName,
                    countryName: airport.address.countryName
                },
                distance: airport.distance
            }));
        } catch (error) {
            throw new Error(`Airport search failed: ${error}`);
        }
    }
}

export const amadeusAirportSearchService = new AmadeusFlightService();