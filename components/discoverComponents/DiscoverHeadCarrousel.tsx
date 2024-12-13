import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Card, CardBody } from "@nextui-org/react";

interface Destination {
    name: string;
    state: string;
    country: string;
    quote: string;
    description: string;
    tags: string[];
    season: string;
    recommendedDuration: string;
    price: number | string;
    image: string;
    startingPrice?: number;
}

interface DestinationCarouselProps {
    destinations: Destination[];
}

const DestinationCarousel: React.FC<DestinationCarouselProps> = ({ destinations = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                handlePrevious();
            } else if (event.key === 'ArrowRight') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative w-full h-screen">
            <div className="absolute inset-0 overflow-hidden">
                {destinations.map((destination, index) => (
                    <div
                        key={`${destination.name}-${index}`}
                        className={`absolute inset-0 ${
                            index === currentIndex ? 'block' : 'hidden'
                        }`}
                    >
                        <Image
                            src={destination.image}
                            alt={`${destination.name}, ${destination.country}`}
                            layout="fill"
                            objectFit="cover"
                            priority={index === 0}
                        />

                        {/* Experience Label */}
                        <div className="absolute top-32 left-32 text-white">
                            <p className="text-sm font-medium tracking-wider mb-4">READY-MADE EXPERIENCE</p>
                            <div className="max-w-lg">
                                <q className="md:text-5xl md:font-bold leading-tight mb-8">
                                    {destination.quote}
                                </q>
                            </div>
                        </div>

                        {/* Information Cards */}
                        <div className="absolute bottom-32 left-32 right-32 flex flex-col gap-4 grid grid-cols-6 gap-0">
                            {/* Location Details Card */}
                            <Card className="bg-black/30 backdrop-blur-md border-none col-span-4">
                                <CardBody className="text-white flex flex-row items-center">
                                    <div className="flex flex-col mr-8 min-w-40">
                                        <h2 className="text-2xl font-bold mb-4">{destination.name}</h2>
                                        <p className="text-lg mb-4">{destination.state}, {destination.country}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm mb-4">{destination.description}</p>
                                        <div className="flex gap-2">
                                            {destination.tags.map((tag, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Trip Details Card */}
                            <Card className="bg-black/30 backdrop-blur-md border-none col-span-2">
                                <CardBody>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-white">
                                            <div className="text-center mx-auto">
                                                <p className="text-sm font-medium mb-2">SEASON</p>
                                                <p className="text-xl">{destination.season}</p>
                                            </div>
                                            <div className="w-px h-12 bg-white/20"/>
                                            <div className="text-center mx-auto">
                                                <p className="text-sm font-medium mb-2">DURATION</p>
                                                <p className="text-xl">{destination.recommendedDuration}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-white mt-8">
                                            <div className="text-center mx-auto">
                                                <p className="text-sm font-medium mb-2">STARTING FROM</p>
                                                <p className="text-xl">{destination.price}€</p>
                                            </div>
                                            <button
                                                className="bg-lime-400 text-black px-6 py-2 rounded-full font-medium hover:bg-lime-300 transition-colors mx-auto">
                                                learn more
                                            </button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <button
                onClick={handlePrevious}
                className="absolute left-8 top-1/2 -translate-y-1/2 text-white/75 hover:text-white transition-colors"
                aria-label="Previous destination"
            >
                <Icon icon="mdi:chevron-left" className="w-12 h-12" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-white/75 hover:text-white transition-colors"
                aria-label="Next destination"
            >
                <Icon icon="mdi:chevron-right" className="w-12 h-12" />
            </button>
        </div>
    );
};

export default DestinationCarousel;