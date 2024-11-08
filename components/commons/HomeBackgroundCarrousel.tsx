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
        }, 8000); // Show each image for 8 seconds total (including transition time)

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        transitionDuration: '2000ms' // 2 second fade transition
                    }}
                >
                    <Image
                        src={img}
                        alt="Background"
                        layout="fill"
                        priority={index === 0}
                    />
                </div>
            ))}
        </div>
    );
};

export default HomeBackgroundCarousel;