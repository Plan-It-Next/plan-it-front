import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { Card, CardBody } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { GetStaticProps } from 'next';
import Header from '@/components/commons/HeaderComponent'
import SearchCard from '@/components/SearchCardComponent';
import HomeBackgroundCarousel from "@/components/commons/HomeBackgroundCarrousel";
import dynamic from 'next/dynamic';
import SynchronizedDestinationsComponent from "@/components/landingComponents/SynchronizedDestinationsComponent";
import SuggestedDestinationsCardsComponent from "@/components/SuggestedDestinationsCardsComponent";
import PersonalizedTripCardComponent from "@/components/PersonalizedTripCardComponent";

// Types
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

interface HomeProps {
  destinations: DestinationInfo[];
}

// Dynamically import the Map component with no SSR
dynamic(() => import('../components/landingComponents/LandingMapComponent'), {
  ssr: false
});

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await import('../public/data/landing-winter-destinations.json');
  console.log(data);
  return {
    props: {
      destinations: data.destinations
    }
  };
};

export default function Home({ destinations }: HomeProps) {
  return (
      <NextUIProvider>
        <div className="min-h-screen">
          <Header />
          <section className="relative">
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
          </section>

          <div className="container w-full py-8 px-4 bg-white mx-auto">
            <h2 className="text-3xl font-bold text-center my-8">Explore Destinations</h2>
            <SynchronizedDestinationsComponent/>
          </div>

          <div className="container w-full py-8 px-4 bg-white mx-auto">
            <Card
                className="p-8 pb-12"
                style={{
                  backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/008/975/566/non_2x/white-snowflakes-on-blue-background-seamless-pattern-falling-snowflakes-on-blue-backdrop-concept-of-winter-holiday-vector.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundBlendMode: 'overlay'
                }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">❄️ Winter recommendations</h2>
              <SuggestedDestinationsCardsComponent destinations={destinations}/>
            </Card>
          </div>

          <div className="container w-full h-2/3 py-8 px-4 mt-12 bg-white mx-auto">
            <PersonalizedTripCardComponent />
          </div>

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