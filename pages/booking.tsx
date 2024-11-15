// pages/booking.tsx
import { useEffect, useState } from 'react';
import Header from "@/components/commons/header/HeaderComponent";
import {Button, Card, CardBody, CardFooter, CardHeader, Spinner} from "@nextui-org/react";
import BookingSection from "@/components/commons/search/BookingSectionComponent";
import { amadeusFlightService } from '@/services/amadeus/AmadeusFlightService';

interface Flight {
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

export default function BookingPage() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchFlights = async () => {
        setLoading(true);
        try {
            const response = await amadeusFlightService.searchFlights({
                originLocationCode: 'MAD',
                destinationLocationCode: 'CDG',
                departureDate: '2024-12-14',
                adults: 1,
                nonStop: false,
                max: 15
            });

            if (response.data) {
                setFlights(response.data);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchFlights();
    }, []);

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (duration: string) => {
        const hours = duration.match(/(\d+)H/)?.[1] || '0';
        const minutes = duration.match(/(\d+)M/)?.[1] || '0';
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className="px-24">
                <Card className="mt-12">
                    <CardBody>
                        <BookingSection />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={searchFlights}>Search</Button>
                    </CardFooter>
                </Card>

                {loading && <Spinner className="mt-8" />}
                {error && <div className="mt-8 text-red-500">{error}</div>}

                {flights.length > 0 && (
                    <div className="mt-8 grid gap-4">
                        {flights.map((flight) => (
                            <Card key={flight.id} className="w-full">
                                <CardHeader className="flex justify-between items-center">
                                    <div className="text-xl font-semibold">
                                        Flight {flight.id}
                                    </div>
                                    <div className="text-lg font-bold text-primary">
                                        {flight.price.currency} {flight.price.total}
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    {flight.itineraries[0].segments.map((segment, index) => (
                                        <div key={index} className="mb-4 border-b last:border-b-0 pb-4">
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="text-lg font-semibold">
                                                        {segment.departure.iataCode} → {segment.arrival.iataCode}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {formatDateTime(segment.departure.at)} → {formatDateTime(segment.arrival.at)}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm">
                                                        Flight {segment.carrierCode} {segment.number}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {formatDuration(flight.itineraries[0].duration)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}