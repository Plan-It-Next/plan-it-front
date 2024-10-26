import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const LandingMapComponent = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (map.current) return;

        // Cities to fly to
        const cities = [
            { name: "Valencia", center: [-0.3763, 39.4699] },
            { name: "Paris", center: [2.3522, 48.8566] },
            { name: "Tokyo", center: [139.6503, 35.6762] },
            { name: "New York", center: [-74.006, 40.7128] },
            { name: "Dubai", center: [55.2708, 25.2048] }
        ];

        // Initialize map
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm9tZW5jbGFpdG9yIiwiYSI6ImNtMm96dzZ0NzBqZHQya3NiMjQwYmNkeW4ifQ.pT1FfyM3aoKL3pIKLgUQXQ';
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/nomenclaitor/cm2p00jbu002n01pk45ig0mr5',
            center: cities[0].center,
            zoom: 11,
            projection: 'globe',
            antialias: true
        });

        map.current.on('load', () => {
            let currentIndex = 0;

            const flyToNextCity = () => {
                const nextCity = cities[currentIndex];

                map.current.flyTo({
                    center: nextCity.center,
                    zoom: 11,
                    duration: 5000,
                    essential: true
                });

                currentIndex = (currentIndex + 1) % cities.length;
                animationRef.current = setTimeout(flyToNextCity, 8000);
            };

            // Start the animation loop
            setTimeout(flyToNextCity, 2000);
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