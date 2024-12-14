import React, { useRef, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Chip, Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';

interface Location {
    name: string;
    location: string;
    inhabitants: number;
    tags: string[];
    image: string;
}

interface DiscoverContinentsProps {
    title: string;
    titleIcon: string;
    description: string;
    subtitle: string;
    buttonText: string;
    direction?: 'ltr' | 'rtl';
    onButtonClick?: () => void;
    locations: Location[];
}

const DiscoverContinents = ({
                                title,
                                titleIcon,
                                description,
                                subtitle,
                                buttonText,
                                direction = 'ltr',
                                onButtonClick,
                                locations
                            }: DiscoverContinentsProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            if (direction === 'ltr') {
                scrollContainerRef.current.scrollLeft = 0;
            } else {
                scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
            }
        }
    }, [direction]);

    const handleScroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = 400;
            const currentScroll = container.scrollLeft;
            const targetScroll = currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount);

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    const TextContent = () => (
        <div className="lg:w-1/3 flex flex-col gap-6 mr-8 self-center">

                {direction == 'ltr' ? (
                    <div className="flex flex-row items-center gap-2">
                        <img src={titleIcon} alt="title icon" className="w-16 h-16"/>
                        <h1 className={`text-5xl font-bold ${direction == 'rtl' ? 'mr-4 text-right' : 'ml-4'}`}>
                            {title}
                        </h1>
                    </div>
                    ) : (
                    <div className={"flex flex-row items-center gap-2"}>
                        <h1 className="text-5xl font-bold ml-auto text-right">
                            {title}
                        </h1>
                        <img src={titleIcon} alt="title icon" className="w-16 h-16"/>
                    </div>
                )}
            <p className={`text-xl ${direction == 'rtl' ? 'mr-12 text-right' : 'ml-12'}`}>
                {description}
            </p>

            <p className={`text-xl ${direction == 'rtl' ? 'mr-4 text-right' : 'ml-4'} italic`}>
                - {subtitle}
            </p>

            <Button
                variant="bordered"
                className={`max-w-fit px-6 py-2 ${direction == 'rtl' ? 'ml-auto' : ''}`}
                onClick={onButtonClick}
                radius="full"
            >
                {buttonText}
            </Button>
        </div>
    );

    const CardsContent = () => (
        <div className="lg:w-2/3 relative group h-full">
            {/* Left Navigation Button */}
            <Button
                isIconOnly
                onClick={() => handleScroll('left')}
                className="opacity-0 group-hover:bg-opacity-60 absolute left-0 top-0 bottom-0 z-10 h-full rounded-none min-w-16 flex items-center justify-center transition-opacity duration-300 bg-gradient-to-r from-black/50 to-transparent"
                aria-label="Scroll left"
            >
                <Icon icon="lucide:chevron-left" className="w-8 h-8 text-white" />
            </Button>

            {/* Right Navigation Button */}
            <Button
                isIconOnly
                onClick={() => handleScroll('right')}
                className="opacity-0 group-hover:bg-opacity-60 absolute right-0 top-0 bottom-0 z-10 h-full rounded-none min-w-16 flex items-center justify-center transition-opacity duration-300 bg-gradient-to-l from-black/50 to-transparent"
                aria-label="Scroll right"
            >
                <Icon icon="lucide:chevron-right" className="w-8 h-8 text-white" />
            </Button>

            <div
                ref={scrollContainerRef}
                className="overflow-x-hidden h-full"
                style={{
                    scrollBehavior: 'smooth',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
            >
                <div
                    className={`flex gap-4 min-w-max h-full ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    {locations.map((location, index) => (
                        <Card
                            key={index}
                            isPressable
                            className="w-80 h-full bg-transparent relative rounded-3xl"
                            radius="lg"
                        >
                            <CardBody className="p-0 h-full">
                                <Image
                                    removeWrapper
                                    alt={location.name}
                                    className="z-0 w-full h-full object-cover"
                                    src={location.image}
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90" />

                                {/* Content overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="text-sm mb-4">
                                        {location.inhabitants.toLocaleString()} inhabitants
                                    </div>

                                    <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
                                    <p className="text-sm mb-4">{location.location}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {location.tags.map((tag, tagIndex) => (
                                            <Chip
                                                key={tagIndex}
                                                variant="flat"
                                                classNames={{
                                                    base: "bg-white/20 text-white",
                                                }}
                                                size="sm"
                                            >
                                                {tag}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row w-full gap-8 p-8 h-[600px]">
            {direction === 'ltr' ? (
                <>
                    <TextContent />
                    <CardsContent />
                </>
            ) : (
                <>
                    <CardsContent />
                    <TextContent />
                </>
            )}
        </div>
    );
};

export default DiscoverContinents;