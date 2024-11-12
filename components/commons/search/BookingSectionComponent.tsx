import React from 'react';
import { Autocomplete, AutocompleteItem, Select, SelectItem, Card, CardBody, DatePicker } from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import PassengerSelector from "@/components/commons/TravelersSelectorComponent";

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

const BookingSection: React.FC = () => {
    const [selectedModes, setSelectedModes] = React.useState<Selection>(new Set(["plane", "train"]));

    const handleSelectionChange = (newSelection: Selection) => {
        if (newSelection === "all") return;
        const selectionSet = newSelection;
        if (selectionSet.size > 0) {
            setSelectedModes(selectionSet);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-6">
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
    );
};

export default BookingSection;