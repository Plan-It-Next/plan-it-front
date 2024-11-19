import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Select, SelectItem, Card, CardBody, DatePicker } from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import PassengerSelector from "@/components/commons/TravelersSelectorComponent";
import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_ID || "",
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET || ""
});

interface Location {
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

const transportModes = [
    { value: 'plane', label: 'Plane' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'ferry', label: 'Ferry' },
];

const BookingSection: React.FC = () => {
    const [selectedModes, setSelectedModes] = useState<Selection>(new Set(["plane", "train"]));
    const [originQuery, setOriginQuery] = useState("");
    const [destQuery, setDestQuery] = useState("");
    const [originResults, setOriginResults] = useState<Location[]>([]);
    const [destResults, setDestResults] = useState<Location[]>([]);
    const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
    const [isLoadingDest, setIsLoadingDest] = useState(false);

    const searchLocations = async (query: string, isOrigin: boolean) => {
        if (query.length < 2) {
            if (isOrigin) {
                setOriginResults([]);
            } else {
                setDestResults([]);
            }
            return;
        }

        if (isOrigin) {
            setIsLoadingOrigin(true);
        } else {
            setIsLoadingDest(true);
        }

        try {
            const response = await amadeus.referenceData.locations.get({
                keyword: query,
                subType: 'CITY',
                'page[limit]': 10
            });

            if (isOrigin) {
                setOriginResults(response.data);
                setIsLoadingOrigin(false);
            } else {
                setDestResults(response.data);
                setIsLoadingDest(false);
            }
        } catch (error) {
            console.error('Error searching locations:', error);
            if (isOrigin) {
                setIsLoadingOrigin(false);
            } else {
                setIsLoadingDest(false);
            }
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (originQuery) {
                searchLocations(originQuery, true);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [originQuery]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (destQuery) {
                searchLocations(destQuery, false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [destQuery]);

    const handleSelectionChange = (newSelection: Selection) => {
        if (newSelection === "all") return;
        if (newSelection.size > 0) {
            setSelectedModes(newSelection);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="grid grid-cols-2 gap-4 col-span-2">
                <Autocomplete
                    label="Origin"
                    placeholder="Origin city"
                    className="h-full mt-2"
                    onInputChange={(value) => setOriginQuery(value)}
                    isLoading={isLoadingOrigin}
                >
                    {originResults.map((location) => (
                        <AutocompleteItem
                            key={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                            value={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                            textValue={location.address.cityName}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm">
                                    {location.address.cityName} | {location.iataCode}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {location.address.countryName}
                                </span>
                            </div>
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete
                    label="Destiny"
                    placeholder="Destiny city"
                    className="h-full mt-2"
                    onInputChange={(value) => setDestQuery(value)}
                    isLoading={isLoadingDest}
                >
                    {destResults.map((location) => (
                        <AutocompleteItem
                            key={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                            value={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                            textValue={location.address.cityName}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm">
                                    {location.address.cityName} | {location.iataCode}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {location.address.countryName}
                                </span>
                            </div>
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <DatePicker
                    label="Departure"
                    isRequired
                    className="mt-2"
                />
                <DatePicker
                    label="Return"
                    isRequired
                    className="mt-2"
                />
            </div>
            <Card>
                <CardBody className="flex flex-col gap-4">
                    <PassengerSelector/>
                    <Select
                        label="Transport Modes"
                        placeholder="Select transport modes"
                        selectionMode="multiple"
                        selectedKeys={selectedModes}
                        onSelectionChange={handleSelectionChange}
                        className="w-full"
                    >
                        {transportModes.map((mode) => (
                            <SelectItem key={mode.value} value={mode.value}>
                                {mode.label}
                            </SelectItem>
                        ))}
                    </Select>
                </CardBody>
            </Card>
        </div>
    );
};

export default BookingSection;