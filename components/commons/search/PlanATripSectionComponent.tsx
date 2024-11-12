import React from 'react';
import { Input, Card, CardBody, DatePicker } from "@nextui-org/react";
import { Icon } from '@iconify/react';

const PlanATripSection: React.FC = () => {
    const [travelers, setTravelers] = React.useState<string>("1");

    const handleTravelersChange = (value: string) => {
        // Only allow positive numbers
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
            setTravelers(value);
        } else if (value === "") {
            setTravelers("");
        }
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="">
                <Card className="col-span-2">
                    <CardBody>
                        <Input
                            type="text"
                            label="Destination"
                            placeholder="Where do you want to go?"
                            labelPlacement="outside"
                            startContent={
                                <Icon icon="material-symbols:location-on" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                        />
                    </CardBody>
                </Card>
                <div className="pt-4">
                    <Input
                        type="number"
                        label="Number of Travelers"
                        labelPlacement="outside"
                        placeholder="How many people will join the trip?"
                        value={travelers}
                        onValueChange={handleTravelersChange}
                        min={1}
                        startContent={
                            <Icon icon="mdi:people" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                </div>
            </div>

            <Card>
                <CardBody>
                    <DatePicker
                        label="Departure"
                        isRequired
                        labelPlacement="outside"
                        placeholder="When do you want to start your journey?"
                        className="w-full"
                    />

                    <DatePicker
                        label="Return"
                        isRequired
                        labelPlacement="outside"
                        placeholder="When do you plan to return?"
                        className="w-full"
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default PlanATripSection;