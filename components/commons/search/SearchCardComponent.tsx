import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { CardFooter } from "@nextui-org/card";
import BookingSection from './BookingSectionComponent';
import PlanATripSection from './PlanATripSectionComponent';

const SearchCard: React.FC = () => {
    const [activeSection, setActiveSection] = React.useState<'booking' | 'planning' | 'inspiration'>('booking');

    const renderActionButton = () => {
        switch (activeSection) {
            case 'planning':
                return (
                    <Button color="primary" size="lg">
                        <Icon icon="mdi:pencil" className="mr-1" />
                        Start!
                    </Button>
                );
            default:
                return (
                    <Button color="primary" size="lg">
                        <Icon icon="mdi:magnify" className="mr-1" />
                        Search
                    </Button>
                );
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
                <div className="flex flex-wrap gap-4 mb-4 w-full">
                    <Button
                        color={activeSection === 'booking' ? 'secondary' : 'default'}
                        variant={activeSection === 'booking' ? 'solid' : 'light'}
                        onClick={() => setActiveSection('booking')}
                    >
                        <Icon icon="mdi:airplane" className="mr-1" />
                        Book a Trip
                    </Button>
                    <Button
                        color={activeSection === 'planning' ? 'secondary' : 'default'}
                        variant={activeSection === 'planning' ? 'solid' : 'light'}
                        onClick={() => setActiveSection('planning')}
                    >
                        <Icon icon="material-symbols:map" className="mr-1" />
                        Plan a trip!
                    </Button>
                    <Button
                        color={activeSection === 'inspiration' ? 'secondary' : 'default'}
                        variant={activeSection === 'inspiration' ? 'solid' : 'light'}
                        onClick={() => setActiveSection('inspiration')}
                    >
                        <Icon icon="solar:lightbulb-bold" className="mr-1" />
                        Get inspired!
                    </Button>
                </div>
                {activeSection === 'booking' && <BookingSection />}
                {activeSection === 'planning' && <PlanATripSection />}
                {activeSection === 'inspiration' && <div>Inspiration section coming soon...</div>}
            </CardBody>
            <CardFooter className="flex justify-between items-center">
                {renderActionButton()}
                <p className="text-gray-500 text-xs max-w-md text-right">
                    Thousands of travel partners across trains, buses, flights and ferries, for you to focus on your journey
                </p>
            </CardFooter>
        </Card>
    );
};

export default SearchCard;