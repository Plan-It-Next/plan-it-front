import React from 'react';
import Image from 'next/image';
import {Button, Card} from "@nextui-org/react";

const LandingPartnersComponent = () => {
    // First half of logos for top carousel
    const firstCarouselLogos = [
        'all_nippon_airways_logo.png',
        'alsa-logo.svg',
        'american-airways-logo.png',
        'british-airways-logo.png',
        'db-logo.svg',
        'delta-logo.png',
        'flix-bus-logo.png',
        'fred-olsen-express-logo.png',
        'iberia-logo.webp',
    ];

    // Second half of logos for bottom carousel
    const secondCarouselLogos = [
        'klm-logo.png',
        'korean-air-logo.png',
        'lufthansa-logo.png',
        'naviera-armas-logo.webp',
        'qatar-airways-logo.png',
        'renfe-logo.png',
        'singapore-airlines-logo.png',
        'sncf-logo.png',
        'vietnam-arilines-logo.png'
    ];

    // Create content that's exactly twice the width of the viewport
    const firstLogos = [...firstCarouselLogos, ...firstCarouselLogos];
    const secondLogos = [...secondCarouselLogos, ...secondCarouselLogos];

    const handleStarAllianceClick = () => {
        window.open('https://www.staralliance.com/es/', '_blank');
    };

    const handleSkyteamClick = () => {
        window.open('https://www.skyteam.com/en', '_blank');
    }

    const handleOneWorldClick = () => {
        window.open('https://www.oneworld.com/');
    }

    return (
        <Card
            className="grid grid-cols-4"
            style={{
                backgroundImage: 'url("/images/qatar-first-class-image.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                height: '75vh'
            }}
            radius="none"
        >
            <div className="col-span-3 flex flex-col-reverse mb-8">
                <div className="w-full py-2 overflow-hidden bg-white/30 backdrop-blur-md border-y-2 border-indigo-700">
                    {/* First carousel - moving right */}
                    <div className="relative mb-8 carousel-container">
                        <div className="carousel-track animate-scroll-right">
                            {firstLogos.map((logo, index) => (
                                <div
                                    key={`right-${index}`}
                                    className="carousel-item mx-8 flex items-center justify-center min-w-[150px] h-20"
                                >
                                    <Image
                                        src={`/images/partners-logos-images/${logo}`}
                                        alt={`Partner logo ${index + 1}`}
                                        width={120}
                                        height={60}
                                        className="object-contain"
                                        priority={index < firstCarouselLogos.length}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second carousel - moving left */}
                    <div className="relative carousel-container">
                        <div className="carousel-track animate-scroll-left">
                            {secondLogos.map((logo, index) => (
                                <div
                                    key={`left-${index}`}
                                    className="carousel-item mx-8 flex items-center justify-center min-w-[150px] h-20"
                                >
                                    <Image
                                        src={`/images/partners-logos-images/${logo}`}
                                        alt={`Partner logo ${index + 1}`}
                                        width={120}
                                        height={60}
                                        className="object-contain"
                                        priority={index < secondCarouselLogos.length}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <style jsx global>{`
                        .carousel-container {
                            overflow: hidden;
                            position: relative;
                            width: 100%;
                        }

                        .carousel-track {
                            display: flex;
                            width: fit-content;
                        }

                        @keyframes scroll-left {
                            from {
                                transform: translateX(0);
                            }
                            to {
                                transform: translateX(calc(-50%));
                            }
                        }

                        @keyframes scroll-right {
                            from {
                                transform: translateX(calc(-50%));
                            }
                            to {
                                transform: translateX(0);
                            }
                        }

                        .animate-scroll-left {
                            animation: scroll-left 90s linear infinite;
                            position: relative;
                        }

                        .animate-scroll-right {
                            animation: scroll-right 90s linear infinite;
                            position: relative;
                        }

                        /* Prevent any user interaction */
                        .animate-scroll-left,
                        .animate-scroll-right {
                            pointer-events: none;
                            user-select: none;
                            will-change: transform;
                        }
                    `}</style>
                </div>
            </div>
            <Card className="col-span-1 mt-8 mr-8 mb-4 bg-white/30 backdrop-blur-md">
                <h1 className="text-black text-5xl font-extrabold mb-8 mt-12 mx-4">All your benefits and points in one single place</h1>
                <div className="flex flex-row-reverse mr-14 mb-4 gap-2">
                    <Button
                        isIconOnly
                        radius="full"
                        className="w-9 h-9 p-0 min-w-0"
                        onClick={handleStarAllianceClick}
                    >
                        <Image
                            src="/images/partners-logos-images/star-alliance-logo.jpg"
                            alt="Star Alliance Logo"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                    </Button>
                    <Button
                        isIconOnly
                        radius="full"
                        className="w-9 h-9 min-w-0 bg-white p-1"
                        onClick={handleSkyteamClick}
                    >
                        <Image
                            src="/images/partners-logos-images/skyteam-logo.png"
                            alt="Skyteam Logo"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                    </Button>
                    <Button
                        isIconOnly
                        radius="full"
                        className="w-9 h-9 min-w-0 bg-white p-1"
                        onClick={handleOneWorldClick}
                    >
                        <Image
                            src="/images/partners-logos-images/oneworld-logo.png"
                            alt="Oneworld Logo"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                        />
                    </Button>
                </div>
                <p className="text-black text-2xl mx-8">With our trusted partners—including top airlines, train lines, and bus companies—you can easily earn, track, and redeem points all in one place. Enjoy exclusive benefits every time you travel, whether by air, rail, road, or sea.</p>
            </Card>
        </Card>
    );
};

export default LandingPartnersComponent;