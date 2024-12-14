import React from 'react';
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import {Icon} from "@iconify/react";

interface Destination {
    name: string;
    state: string;
    country: string;
    description: string;
    image: string;
}

interface DestinationProps {
    destination: Destination;
}

const DiscoverDestinationInfoCardComponent: React.FC<DestinationProps> = ({destination}) => {
    return (
        <Card
            onClick={() => {
                window.open(`/destinations/${encodeURIComponent(destination.name)}?state=${encodeURIComponent(destination.state)}&country=${encodeURIComponent(destination.country)}`)
            }}
            style={{
                backgroundImage: `url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60vh'
            }}
        >
            <CardHeader className="flex flex-row-reverse">
                <Icon icon="material-symbols:share-outline" className="mr-1 h-5 w-5 text-white"/>
                <Icon icon="lucide:plane" className="mr-1 h-5 w-5 text-white"/>
            </CardHeader>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-50"/>
            <CardBody className="flex flex-col-reverse w-full h-full p-8">
                <div className="flex flex-col text-white">
                    <h1 className="font-bold text-2xl text-red">{destination.name}</h1>
                    <h2 className="text-xl">{destination.state}, {destination.country}</h2>
                    <p className="mt-4">{destination.description}</p>
                </div>
            </CardBody>
        </Card>
    );
}

export default DiscoverDestinationInfoCardComponent;