import React from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";

interface Highlight {
    icon: string;
    title: string;
    description: string;
}

interface DestinationImage {
    url: string;
    alt: string;
}

interface DestinationInfoProps {
    mainImage: DestinationImage;
    title: string;
    location: string;
    description: string;
    highlights: Highlight[];
    galleryImages: DestinationImage[];
}

const DestinationInfoCardComponent: React.FC<DestinationInfoProps> = ({
      mainImage,
      title,
      location,
      description,
      highlights,
      galleryImages
  }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Image
                alt={mainImage.alt}
                className="object-cover w-full h-64 md:h-full md:col-span-1"
                src={mainImage.url}
            />
            <div className="flex flex-col col-span-1 md:col-span-3">
                <Card>
                    <CardBody>
                        <div>
                            <h1 className="font-bold text-2xl md:text-4xl">{title} - {location}</h1>
                            <div className="p-4">
                                <p>{description}</p>
                                <ul className="pt-4 pl-4">
                                    {highlights.map((highlight, index) => (
                                        <li key={index}>
                                            {highlight.icon} <b>{highlight.title}</b> – {highlight.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <div className="mt-4">
                    {/* Mobile gallery - horizontally scrollable */}
                    <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="snap-center flex-shrink-0 first:pl-0">
                                <Image
                                    alt={image.alt}
                                    className="h-40 w-auto object-contain"
                                    src={image.url}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Desktop gallery - grid layout */}
                    <div className="hidden md:flex flex-row gap-4">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="flex-1">
                                <Image
                                    alt={image.alt}
                                    className="h-40 w-full object-cover"
                                    src={image.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationInfoCardComponent;