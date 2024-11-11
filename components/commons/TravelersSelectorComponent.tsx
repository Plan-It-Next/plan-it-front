import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    ButtonGroup
} from "@nextui-org/react";

type PassengerType = 'adult' | 'youth' | 'senior';

interface PassengerCounts {
    adult: number;
    youth: number;
    senior: number;
}

const PassengerSelector = () => {
    const [counts, setCounts] = React.useState<PassengerCounts>({
        adult: 1,
        youth: 0,
        senior: 0
    });

    const updateCount = (type: PassengerType, increment: number): void => {
        setCounts(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + increment)
        }));
    };

    const totalPassengers = Object.values(counts).reduce((a, b) => a + b, 0);

    return (
        <div className="max-w-xs">
            <div className="flex flex-col gap-0.5">
                <label className="block text-sm font-medium text-foreground-500">Passengers</label>
                <Popover placement="bottom">
                    <PopoverTrigger>
                        <Button
                            variant="bordered"
                            className="h-unit-14 text-left justify-start font-normal text-default-500 hover:bg-default-100"
                            fullWidth
                        >
                            {totalPassengers} Passenger{totalPassengers !== 1 ? 's' : ''}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                        <div className="p-4">
                            {/* Adult Section */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-lg font-semibold">Adult</p>
                                    <p className="text-sm text-gray-500">26-57 years</p>
                                </div>
                                <ButtonGroup>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('adult', -1)}
                                        isDisabled={counts.adult <= 0}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        isDisabled
                                        className="w-12"
                                    >
                                        {counts.adult}
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('adult', 1)}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </div>

                            {/* Youth Section */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-lg font-semibold">Youth</p>
                                    <p className="text-sm text-gray-500">0-25 years</p>
                                </div>
                                <ButtonGroup>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('youth', -1)}
                                        isDisabled={counts.youth <= 0}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        isDisabled
                                        className="w-12"
                                    >
                                        {counts.youth}
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('youth', 1)}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </div>

                            {/* Senior Section */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-lg font-semibold">Senior</p>
                                    <p className="text-sm text-gray-500">58+ years</p>
                                </div>
                                <ButtonGroup>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('senior', -1)}
                                        isDisabled={counts.senior <= 0}
                                    >
                                        -
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="light"
                                        isDisabled
                                        className="w-12"
                                    >
                                        {counts.senior}
                                    </Button>
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        onClick={() => updateCount('senior', 1)}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default PassengerSelector;