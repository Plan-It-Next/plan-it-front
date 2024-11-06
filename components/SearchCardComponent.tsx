import React from 'react';
import { Card, CardBody, Button, Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { DatePicker } from "@nextui-org/react";
import PassengerSelector from "@/components/TravelersSelectorComponent";
import { Selection } from "@nextui-org/react";
import {CardFooter} from "@nextui-org/card";

const airports = [
    { code: 'LHR', name: 'London Heathrow Airport', city: 'London' },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris' },
    { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
    { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid' },
    { code: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome' },
    { code: 'MUC', name: 'Munich Airport', city: 'Munich' },
    { code: 'BCN', name: 'Barcelona–El Prat Airport', city: 'Barcelona' },
    { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich' },
    { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen' },
];

const transportModes = [
    { value: 'plane', label: 'Plane' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' },
    { value: 'ferry', label: 'Ferry' },
];

const SearchCard: React.FC = () => {
    const [selectedModes, setSelectedModes] = React.useState<Selection>(new Set(["plane", "train"]));

    // Ensure at least one mode is selected
    const handleSelectionChange = (newSelection: Selection) => {
        if (newSelection === "all") return;

        // Convert to Set if it isn't already
        const selectionSet = newSelection;

        // Only update if at least one item is selected
        if (selectionSet.size > 0) {
            setSelectedModes(selectionSet);
        }
    };

    return (
        <Card
            isBlurred
            shadow="sm"
            radius="lg"
            className="w-full max-w-4xl mx-auto rounded-xl"
        >
            <CardBody>
                <div className="flex md:flex-wrap md:gap-4 gap-1 mb-4 w-full">
                    <Button color="secondary">
                        <Icon icon="mdi:airplane" />
                        Book a Trip
                    </Button>
                    <Button color="default" variant="light">
                        <Icon icon="material-symbols:map" />
                        Plan a trip!
                    </Button>
                    <Button color="default" variant="light">
                        <Icon icon="solar:lightbulb-bold" />
                        Get inspired!
                    </Button>
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 col-span-2">
                        <Autocomplete
                            label="Origin"
                            placeholder="Origin airport"
                            className="h-full mt-2"
                        >
                            {airports.map((airport) => (
                                <AutocompleteItem key={`${airport.city} - ${airport.name}`} value={airport.code}>
                                    {`${airport.city} - ${airport.name}`}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Autocomplete
                            label="Destiny"
                            placeholder="Destiny airport"
                            className="h-full mt-2"
                        >
                            {airports.map((airport) => (
                                <AutocompleteItem key={`${airport.city} - ${airport.name}`} value={airport.code}>
                                    {`${airport.city} - ${airport.name}`}
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
            </CardBody>
            <CardFooter className="flex justify-between items-center">
                <Button color="primary" size="lg">
                    <Icon icon="mdi:magnify" className="mr-1" />
                    Search
                </Button>
                <p className="hidden md:flex text-gray-500 text-xs max-w-md text-right">
                    Thousands of travel partners across trains, buses, flights and ferries, for you to focus on your journey
                </p>
            </CardFooter>
        </Card>
    );
};

export default SearchCard;