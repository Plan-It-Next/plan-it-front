import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Card, CardBody } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import Header from '../components/layout/HeaderComponent'
import SearchCard from '../components/SearchCardComponent';
import HomeBackgroundCarousel from "@/components/layout/HomeBackgroundCarrousel";
import dynamic from 'next/dynamic';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('../components/LandingMapComponent'), {
  ssr: false
});

export default function Home() {
  return (
      <NextUIProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="relative">
            <div className="relative h-screen">
              <HomeBackgroundCarousel />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl font-bold mb-4">Plan Your Dream Vacation</h1>
                <p className="text-xl mb-8">Discover amazing destinations and create unforgettable memories</p>
                <div className="w-full max-w-4xl px-4">
                  <SearchCard />
                </div>
              </div>
            </div>
          </main>

          {/* New Map Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Explore Destinations</h2>
              <MapComponent />
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Enhance Your Travel Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card>
                  <CardBody>
                    <Icon icon="mdi:tag-multiple" className="text-4xl mb-2 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
                    <p>Find the best offers for your next adventure</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Icon icon="mdi:map-marker" className="text-4xl mb-2 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Top Destinations</h3>
                    <p>Explore popular locations around the world</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Icon icon="mdi:shield-check" className="text-4xl mb-2 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Travel Insurance</h3>
                    <p>Protect your journey with comprehensive coverage</p>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <Icon icon="mdi:gift" className="text-4xl mb-2 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Loyalty Program</h3>
                    <p>Earn points and enjoy exclusive benefits</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </NextUIProvider>
  );
}