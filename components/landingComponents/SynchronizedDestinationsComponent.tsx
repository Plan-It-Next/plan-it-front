import React, { useState, useEffect } from 'react';
import LandingMapComponent from './LandingMapComponent';
import DestinationCarousel from './LandingDestinationInfoCarrousel';

const cities = [
    { name: "Valencia", center: [-0.3763, 39.4699], zoom: 11 },
    { name: "Dubai", center: [55.2708, 25.2048], zoom: 9 },
    { name: "Tokyo", center: [139.6503, 35.6762], zoom: 8 },
    { name: "Los Angeles", center: [-118.2436, 34.0522], zoom: 8},
];

const SynchronizedDestinations = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === cities.length - 1 ? 0 : prevIndex + 1
            );
        }, 25000); // Match the duration in the map component

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full space-y-8">
            <LandingMapComponent
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            <DestinationCarousel
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </div>
    );
};

export default SynchronizedDestinations;