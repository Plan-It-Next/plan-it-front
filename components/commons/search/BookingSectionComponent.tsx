import React, { useState, useEffect, useContext } from 'react';
import {
    Autocomplete,
    AutocompleteItem,
    Select,
    SelectItem,
    Card,
    CardBody,
    DatePicker,
    Button,
    Input,
} from '@nextui-org/react';
import { Selection } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import Amadeus from 'amadeus';
import { TravelSearchContext } from '@/context/TravelSearchContext';

function toPascalCase(str) {
  return str
    .toLowerCase() // Convierte toda la cadena a minúsculas
    .replace(/(?:^|\s|_|-)(\w)/g, (match, p1) => p1.toUpperCase()) // Convierte la primera letra de cada palabra a mayúsculas
    .replace(/[\s_-]/g, ''); // Elimina espacios, guiones bajos y guiones
}

const amadeus = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_ID || '',
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET || '',
});

interface LocationData {
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
    { value: 'avion', label: 'Plane' },
    { value: 'tren', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'ferry', label: 'Ferry' },
];

const BookingSection: React.FC = () => {
    const { selectedModes,
                travelers,
                returnDate,
                departureDate,
                isLoadingDest,
                isLoadingOrigin,
                destResults,
                originResults,
                destQuery,
                originQuery,
                setFormState,
 } = useContext(TravelSearchContext);
    // const [formState, setFormState] = useState({
    //     selectedModes: new Set(['plane', 'train']) as Selection,
    //     originQuery: '',
    //     destQuery: '',
    //     originResults: [] as Array<LocationData>,
    //     destResults: [] as Array<LocationData>,
    //     isLoadingOrigin: false,
    //     isLoadingDest: false,
    //     departureDate: '',
    //     returnDate: '',
    //     travelers: 1,
    // });

    const searchLocations = async (query: string, isOrigin: boolean) => {
        if (query.length < 2) {
            if (isOrigin) {
                setFormState((prevState) => ({ ...prevState, originResults: [] }));
            } else {
                setFormState((prevState) => ({ ...prevState, destResults: [] }));
            }
            return;
        }

        if (isOrigin) {
            setFormState((prevState) => ({ ...prevState, isLoadingOrigin: true }));
        } else {
            setFormState((prevState) => ({ ...prevState, isLoadingDest: true }));
        }

        try {
            const response = await amadeus.referenceData.locations.get({
                keyword: query,
                subType: 'CITY',
                'page[limit]': 10,
            });

            if (isOrigin) {
                setFormState((prevState) => ({
                    ...prevState,
                    originResults: response.data,
                    isLoadingOrigin: false,
                }));
            } else {
                setFormState((prevState) => ({
                    ...prevState,
                    destResults: response.data,
                    isLoadingDest: false,
                }));
            }
        } catch (error) {
            console.error('Error searching locations:', error);
            if (isOrigin) {
                setFormState((prevState) => ({ ...prevState, isLoadingOrigin: false }));
            } else {
                setFormState((prevState) => ({ ...prevState, isLoadingDest: false }));
            }
        }
    };

    useEffect(() => {
        searchLocations(originQuery, true);
    }, [originQuery]);

    useEffect(() => {
        searchLocations(destQuery, false);
    }, [destQuery]);

    const handleSelectionChange = (newSelection: Selection) => {
        if (newSelection.size > 0) {
            setFormState((prevState) => ({ ...prevState, selectedModes: newSelection }));
        }
    };

    const handleSearch = async () => {
        const requestData = {
            ciudad_origen: toPascalCase(originQuery),
            ciudad_destino: toPascalCase(destQuery),
            pais: "",
            tipo_ruta: String(Array.from(selectedModes).pop()),
            fecha: departureDate.toString(),
            precio_billete: null,
            distancia: null,
            duracion: null,
        };

        console.log('Sending data to API:', requestData);

        try {
            const response = await fetch('http://localhost:8000/trip/viaje_filtro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data from API');
            }

            const responseData = await response.json();
            console.log('API response:', responseData);
            // Aquí podrías manejar la respuesta y actualizar el estado global/contexto
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="grid grid-cols-2 gap-4 col-span-2">
                    <Autocomplete
                        label="Origin"
                        placeholder="Origin city"
                        className="h-full mt-2"
                        onInputChange={(value) =>
                            setFormState((prevState) => ({ ...prevState, originQuery: value }))
                        }
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
                        onInputChange={(value) =>
                            setFormState((prevState) => ({ ...prevState, destQuery: value }))
                        }
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
                        onChange={(date) =>
                            setFormState((prevState) => ({ ...prevState, departureDate: date }))
                        }
                    />
                    <DatePicker
                        label="Return"
                        className="mt-2"
                        onChange={(date) =>
                            setFormState((prevState) => ({ ...prevState, returnDate: date }))
                        }
                    />
                </div>
                <Card>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            type="number"
                            label="Travelers"
                            value={travelers}
                            onChange={(e) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    travelers: Number(e.target.value),
                                }))
                            }
                        />
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
            <div className="flex justify-end mt-4">
                <Button color="primary" size="lg" onClick={handleSearch}>
                    <Icon icon="mdi:magnify" className="mr-1" />
                    Search
                </Button>
            </div>
        </div>
    );
};

export default BookingSection;
