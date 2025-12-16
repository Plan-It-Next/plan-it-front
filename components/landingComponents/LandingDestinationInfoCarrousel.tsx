import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationInfoCardComponent from '../commons/DestinationInfoCardComponent';

interface Image {
    url: string;
    alt: string;
}

interface Highlight {
    icon: string;
    title: string;
    description: string;
}

interface Destination {
    mainImage: Image;
    title: string;
    location: string;
    description: string;
    highlights: Highlight[];
    galleryImages: Image[];
}

interface Props {
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

const fadeInTransition = {
    duration: 2
};

const fadeOutTransition = {
    duration: 1
};

const DestinationCarousel: React.FC<Props> = ({ currentIndex, setCurrentIndex }) => {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        import('../../public/data/landing-destination-carousel-destinations.json').then(data => {
            setDestinations(data.destinations);
        });
    }, []);

    if (!destinations.length) return null;

    return (
        <div className="flex flex-col items-center">
            <div className="w-full relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={fadeInTransition}
                    >
                        <DestinationInfoCardComponent {...destinations[currentIndex]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-4 mt-4">
                {destinations.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-400`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DestinationCarousel;