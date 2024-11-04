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
        <div className="grid grid-cols-4 gap-4">
            <Image
                alt={mainImage.alt}
                className="object-cover col-span-1 h-full"
                src={mainImage.url}
            />
            <div className="flex flex-col col-span-3">
                <Card>
                    <CardBody>
                        <div>
                            <h1 className="font-bold text-4xl">{title} - {location}</h1>
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
                <div className="flex flex-row mt-4 gap-4">
                    {galleryImages.map((image, index) => (
                        <Image
                            key={index}
                            alt={image.alt}
                            className="h-40"
                            src={image.url}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DestinationInfoCardComponent;