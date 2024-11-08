import React, { useEffect, useState } from 'react';
import { Card, Image as NextUIImage, Link } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

interface ImageData {
    src: string;
    keyword: string;
}

interface ImagePreloaderProps {
    images: ImageData[];
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images }) => {
    return (
        <div className="hidden">
            {images.map((imgData: ImageData, index: number) => (
                <Image
                    key={index}
                    src={imgData.src}
                    alt="preload"
                    width={128}
                    height={128}
                />
            ))}
        </div>
    );
};

const PersonalizedTripCardComponent: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const imageData: ImageData[] = [
        {
            src: '/images/landing-personalized-trips-pictures/couple-travel-picture.png',
            keyword: 'with your couple'
        },
        {
            src: '/images/landing-personalized-trips-pictures/family-travel-picture.png',
            keyword: 'with your family'
        },
        {
            src: '/images/landing-personalized-trips-pictures/group-travel-picture.png',
            keyword: 'with your friends'
        },
        {
            src: '/images/landing-personalized-trips-pictures/individual-travel-picture.png',
            keyword: 'all by yourself'
        }
    ];

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = imageData.map((img) => {
                return new Promise<void>((resolve, reject) => {
                    const image = new window.Image();
                    image.onload = () => resolve();
                    image.onerror = reject;
                    image.src = img.src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Error preloading images:", error);
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imageData.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [imagesLoaded]);

    if (!imagesLoaded) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="relative mt-16">
            <ImagePreloader images={imageData} />

            <Card
                className="md:flex md:flex-row min-h-96 md:object-left p-8 overflow-visible"
                style={{
                    backgroundImage: 'url("https://pic.netbian.com/uploads/allimg/230409/235309-1681055589590d.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Card
                    className="absolute left-8 -top-24 w-1/3 p-4 bg-gray-200/30 backdrop-blur-sm justify-center items-center rounded-xl border-teal-200"
                >
                    <Link
                        className="text-5xl pl-8 font-extrabold my-8 text-black"
                        href="/trip-creator"
                        showAnchorIcon
                    >
                        Plan your own adventures
                    </Link>
                    <p className="text-2xl px-8">
                        Design a trip that is uniquely yours, tailored to your interests and pace.
                        Manage and book travel and hotel options with ease. Craft your perfect weekend getaway,
                        an exotic winter escape, or an unforgettable summer adventure.
                    </p>
                </Card>


                <Card
                    className="absolute right-8 -bottom-16 w-1/5 bg-gray-200/30 backdrop-blur-sm justify-center items-center rounded-xl border-teal-200 p-4"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeIn"
                                }
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                transition: {
                                    duration: 0.5,
                                    ease: "easeOut"
                                }
                            }}
                            className="md:flex md:flex-row items-center justify-center w-full gap-4"
                        >
                            <NextUIImage
                                as={Image}
                                src={imageData[currentIndex].src}
                                alt="travel image"
                                className="object-contain m-0"
                                width={128}
                                height={128}
                            />
                            <motion.p
                                className="text-xl font-bold"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeIn",
                                        delay: 0.4
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }
                                }}
                            >
                                Plan it {imageData[currentIndex].keyword}!
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </Card>
            </Card>
        </div>
    );
}

export default PersonalizedTripCardComponent;