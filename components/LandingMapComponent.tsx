import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface City {
    name: string;
    center: [number, number];
    zoom: number;
}

const LandingMapComponent = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const animationRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        // Cities to fly to with proper typing
        const cities: City[] = [
            { name: "Valencia", center: [-0.3763, 39.4699], zoom: 11 },
            { name: "Paris", center: [2.3522, 48.8566], zoom: 9 },
            { name: "Dubai", center: [55.2708, 25.2048], zoom: 9 },
            { name: "Tokyo", center: [139.6503, 35.6762], zoom: 8 },
            { name: "Los Angeles", center: [-118.2436, 34.0522], zoom: 8},
            { name: "Chicago", center: [-87.6231, 41.8818], zoom: 9 },
        ];

        // Initialize map
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9tZW5jbGFpdG9yIiwiYSI6ImNtMm96dzZ0NzBqZHQya3NiMjQwYmNkeW4ifQ.pT1FfyM3aoKL3pIKLgUQXQ';

        const mapDiv = mapContainer.current;
        const mapInstance = new mapboxgl.Map({
            container: mapDiv,
            style: 'mapbox://styles/nomenclaitor/cm2p00jbu002n01pk45ig0mr5',
            center: cities[0].center,
            zoom: 9,
            projection: 'globe',
            antialias: true
        });

        map.current = mapInstance;

        mapInstance.on('load', () => {
            let currentIndex = 0;

            const flyToNextCity = () => {
                const nextCity = cities[currentIndex];

                mapInstance.flyTo({
                    center: nextCity.center,
                    zoom: nextCity.zoom,
                    duration: 14000,
                    essential: true
                });

                currentIndex = (currentIndex + 1) % cities.length;

                animationRef.current = setTimeout(flyToNextCity, 18000);
            };

            // Interaction management functions
            const startInteraction = () => {
                console.log('starting interaction');
                if (animationRef.current) {
                    clearTimeout(animationRef.current);
                }
            };

            const endInteraction = () => {
                console.log('ending interaction');
                // Only resume if all interactions have ended
                animationRef.current = setTimeout(flyToNextCity, 10000);
            };

            mapInstance.on('dragstart', () => startInteraction());
            mapInstance.on('dragend', () => endInteraction());

            // Start the animation loop
            flyToNextCity();
        });

        return () => {
            if (animationRef.current) clearTimeout(animationRef.current);
            if (map.current) map.current.remove();
        };
    }, []);

    return (
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
            <div ref={mapContainer} className="w-full h-full" />
        </div>
    );
};

export default LandingMapComponent;