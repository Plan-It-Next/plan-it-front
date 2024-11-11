import React, {useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface City {
    name: string;
    center: [number, number];
    zoom: number;
}

interface Props {
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

const LandingMapComponent: React.FC<Props> = ({ currentIndex, setCurrentIndex }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const animationRef = useRef<NodeJS.Timeout | null>(null);

    const cities: City[] = [
        { name: "Valencia", center: [-0.3763, 39.4699], zoom: 11 },
        { name: "Dubai", center: [55.2708, 25.2048], zoom: 9 },
        { name: "Tokyo", center: [139.6503, 35.6762], zoom: 8 },
        { name: "Los Angeles", center: [-118.2436, 34.0522], zoom: 8},
    ];

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9tZW5jbGFpdG9yIiwiYSI6ImNtMm96dzZ0NzBqZHQya3NiMjQwYmNkeW4ifQ.pT1FfyM3aoKL3pIKLgUQXQ';

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/nomenclaitor/cm2p00jbu002n01pk45ig0mr5',
            center: cities[currentIndex].center,
            zoom: cities[currentIndex].zoom,
            projection: 'globe',
            antialias: true
        });

        return () => {
            if (map.current) map.current.remove();
        };
    }, []);

    // Effect to handle map movements based on currentIndex changes
    useEffect(() => {
        if (!map.current) return;

        map.current.flyTo({
            center: cities[currentIndex].center,
            zoom: cities[currentIndex].zoom,
            duration: 20000,
            essential: true
        });
    }, [currentIndex]);

    // Effect to handle user interactions
    useEffect(() => {
        if (!map.current) return;

        const startInteraction = () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };

        const endInteraction = () => {
            // Resume the animation cycle after interaction
            animationRef.current = setTimeout(() => {
                // Calculate the next index directly instead of using a callback
                const nextIndex = currentIndex === cities.length - 1 ? 0 : currentIndex + 1;
                setCurrentIndex(nextIndex);
            }, 10000);
        };

        map.current.on('dragstart', startInteraction);
        map.current.on('dragend', endInteraction);

        return () => {
            if (map.current) {
                map.current.off('dragstart', startInteraction);
                map.current.off('dragend', endInteraction);
            }
        };
    }, [setCurrentIndex, currentIndex]); // Added currentIndex to dependencies

    return (
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
            <div ref={mapContainer} className="w-full h-full" />
        </div>
    );
};

export default LandingMapComponent;