import React from "react";
import { Card } from "@nextui-org/react";

interface CoverImage {
    url: string;
    alt: string;
}

interface Recommendation {
    icon: string;
    reason: string;
}

interface DestinationInfo {
    location: string;
    description: string;
    recommendation: Recommendation;
    coverImage: CoverImage;
    price: number;
}

interface Props {
    destinations?: DestinationInfo[];  // Make destinations optional
}

const SuggestedDestinationsCardsComponent: React.FC<Props> = ({ destinations = [] }) => {  // Provide default empty array
    if (!destinations || destinations.length === 0) {
        return <div className="w-full text-center">No destinations available</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((info, index) => (
                <Card
                    key={index}
                    className="h-[400px] w-full border-none relative group cursor-pointer overflow-hidden"
                    style={{
                        backgroundImage: `url(${info.coverImage.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                        <div className="flex justify-between items-start text-white mb-2">
                            <h2 className="text-xl font-extrabold">{info.location}</h2>
                            <div className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm flex flex-row items-center justify-center gap-1">
                                <span>{info.recommendation.icon}</span>
                                <p>{info.recommendation.reason}</p>
                            </div>
                        </div>
                        <p className="text-sm bg-white/20 text-white mb-4 backdrop-blur-sm p-2 rounded-2xl">{info.description}</p>
                        <div className="flex justify-end">
                            <p className="text-white text-xl font-bold">From: {info.price}€</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default SuggestedDestinationsCardsComponent;