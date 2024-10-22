import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HomeBackgroundCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/images/ferry-home-image.jpg',
        '/images/home-travel-image.jpg',
        '/images/red-train-home-image.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Image
                        src={img}
                        alt="Background"
                        layout="fill"
                        objectFit="cover"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
};

export default HomeBackgroundCarousel;