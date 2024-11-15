import { amadeusAuthService } from './AmadeusAuthService';

interface FlightSearchParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults?: number;
    children?: number;
    infants?: number;
    travelClass?: string;
    nonStop?: boolean;
    currencyCode?: string;
    maxPrice?: number;
    max?: number;
    includedAirlineCodes?: string;
    excludedAirlineCodes?: string;
}

export class AmadeusFlightService {
    private readonly baseUrl = 'https://test.api.amadeus.com';

    async searchFlights(params: FlightSearchParams) {
        try {
            const token = await amadeusAuthService.getAccessToken();

            const queryParams = new URLSearchParams({
                originLocationCode: params.originLocationCode,
                destinationLocationCode: params.destinationLocationCode,
                departureDate: params.departureDate,
                adults: (params.adults || 1).toString(),
                nonStop: (params.nonStop || false).toString(),
                max: (params.max || 250).toString(),
                ...(params.returnDate && { returnDate: params.returnDate }),
                ...(params.children && { children: params.children.toString() }),
                ...(params.infants && { infants: params.infants.toString() }),
                ...(params.travelClass && { travelClass: params.travelClass }),
                ...(params.currencyCode && { currencyCode: params.currencyCode }),
                ...(params.maxPrice && { maxPrice: params.maxPrice.toString() }),
                ...(params.includedAirlineCodes && { includedAirlineCodes: params.includedAirlineCodes }),
                ...(params.excludedAirlineCodes && { excludedAirlineCodes: params.excludedAirlineCodes }),
            });

            const response = await fetch(`${this.baseUrl}/v2/shopping/flight-offers?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Flight search failed with status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            throw new Error(`Flight search failed: ${error}`);
        }
    }
}

export const amadeusFlightService = new AmadeusFlightService();