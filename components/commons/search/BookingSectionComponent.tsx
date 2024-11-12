import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Select, SelectItem, Card, CardBody, DatePicker } from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import PassengerSelector from "@/components/commons/TravelersSelectorComponent";

interface Location {
    name: string;
    iataCode: string;
    address: {
        countryName: string;
        cityName: string;
    };
    subType: string;
}

interface AmadeusResponse {
    data: Location[];
}

interface ValidationErrors {
    origin?: string;
    destiny?: string;
    dates?: string;
    transport?: string;
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
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [selectedDestiny, setSelectedDestiny] = useState("");
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [returnDate, setReturnDate] = useState<Date | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateForm = () => {
        const newErrors: ValidationErrors = {};

        // Check if origin is selected
        if (!selectedOrigin) {
            newErrors.origin = "Origin city is required";
        }

        // Check if destiny is selected
        if (!selectedDestiny) {
            newErrors.destiny = "Destination city is required";
        }

        // Check if origin and destiny are different
        if (selectedOrigin && selectedDestiny && selectedOrigin === selectedDestiny) {
            newErrors.destiny = "Origin and destination cannot be the same";
        }

        // Check if dates are selected and valid
        if (!departureDate || !returnDate) {
            newErrors.dates = "Both dates are required";
        } else {
            if (departureDate > returnDate) {
                newErrors.dates = "Return date must be after departure date";
            }
        }

        // Check if at least one transport mode is selected
        if (selectedModes.size === 0) {
            newErrors.transport = "At least one transport mode is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getAmadeusToken = async () => {
        try {
            const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: 'Rhe76PRIpCK2OhNBSd2IVScsQlwMlapu',
                    client_secret: 'YU2G9r6p9994vSvx',
                }),
            });
            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error);
            return null;
        }
    };

    const searchLocations = async (query: string, isOrigin: boolean) => {
        if (query.length < 2) {
            isOrigin ? setOriginResults([]) : setDestResults([]);
            return;
        }

        isOrigin ? setIsLoadingOrigin(true) : setIsLoadingDest(true);

        try {
            const token = await getAmadeusToken();
            const response = await fetch(
                `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}&page[limit]=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data: AmadeusResponse = await response.json();

            if (isOrigin) {
                setOriginResults(data.data);
                setIsLoadingOrigin(false);
            } else {
                setDestResults(data.data);
                setIsLoadingDest(false);
            }
        } catch (error) {
            console.error('Error searching locations:', error);
            isOrigin ? setIsLoadingOrigin(false) : setIsLoadingDest(false);
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
            setErrors(prev => ({ ...prev, transport: undefined }));
        }
    };

    const handleDepartureDateChange = (date: Date | null) => {
        setDepartureDate(date);
        if (date && returnDate && date <= returnDate) {
            setErrors(prev => ({ ...prev, dates: undefined }));
        }
    };

    const handleReturnDateChange = (date: Date | null) => {
        setReturnDate(date);
        if (date && departureDate && departureDate <= date) {
            setErrors(prev => ({ ...prev, dates: undefined }));
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
                    onSelectionChange={(value) => {
                        setSelectedOrigin(value as string);
                        setErrors(prev => ({ ...prev, origin: undefined }));
                        // Check if new origin matches destiny
                        if (value === selectedDestiny) {
                            setErrors(prev => ({ ...prev, destiny: "Origin and destination cannot be the same" }));
                        }
                    }}
                    isLoading={isLoadingOrigin}
                    isRequired
                    errorMessage={errors.origin}
                    isInvalid={!!errors.origin}
                >
                    {originResults.map((location) => (
                        <AutocompleteItem
                            key={location.iataCode}
                            value={location.iataCode}
                            textValue={location.address.cityName}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm">
                                    {location.address.cityName}
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
                    onSelectionChange={(value) => {
                        setSelectedDestiny(value as string);
                        setErrors(prev => ({ ...prev, destiny: undefined }));
                        // Check if new destiny matches origin
                        if (value === selectedOrigin) {
                            setErrors(prev => ({ ...prev, destiny: "Origin and destination cannot be the same" }));
                        }
                    }}
                    isLoading={isLoadingDest}
                    isRequired
                    errorMessage={errors.destiny}
                    isInvalid={!!errors.destiny}
                >
                    {destResults.map((location) => (
                        <AutocompleteItem
                            key={location.iataCode}
                            value={location.iataCode}
                            textValue={location.address.cityName}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm">
                                    {location.address.cityName}
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
                    onChange={handleDepartureDateChange}
                    errorMessage={errors.dates}
                    isInvalid={!!errors.dates}
                />
                <DatePicker
                    label="Return"
                    isRequired
                    className="mt-2"
                    onChange={handleReturnDateChange}
                    errorMessage={errors.dates}
                    isInvalid={!!errors.dates}
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
                        isRequired
                        errorMessage={errors.transport}
                        isInvalid={!!errors.transport}
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