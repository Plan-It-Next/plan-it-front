import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const LandingMapComponent = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    // Updated coordinates for Valencia
    const [lng] = useState(-0.38);
    const [lat] = useState(39.47);
    // Adjusted zoom level for better city view
    const [zoom] = useState(12);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
            // Optional: add pitch and bearing for a more interesting initial view
            pitch: 45,
            bearing: -17.6
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Optional: Add a marker at the center of Valencia
        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current);

        // Cleanup
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [lng, lat, zoom]);

    return (
        <div className="relative w-full h-[500px] bg-gray-100">
            <div ref={mapContainer} className="absolute inset-0" />
        </div>
    );
};

export default LandingMapComponent;