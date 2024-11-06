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
    duration: 2,
    ease: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]
};

const fadeOutTransition = {
    duration: 1,
    ease: [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05, 0]
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
                        animate={{
                            opacity: 1,
                            transition: fadeInTransition
                        }}
                        exit={{
                            opacity: 0,
                            transition: fadeOutTransition
                        }}
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