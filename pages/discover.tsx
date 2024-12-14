import { GetStaticProps } from 'next';
import Header from '../components/commons/header/HeaderComponent';
import DiscoverDestinationInfoCardComponent from "@/components/commons/DiscoverDestinationInfoCardComponent";
import DiscoverHeadCarrousel from "@/components/discoverComponents/DiscoverHeadCarrousel";
import Footer from "@/components/commons/FooterComponent";
import DiscoverContinents from "@/components/discoverComponents/DiscoverContinents";
import fs from 'fs';
import path from 'path';

// Type definitions
interface Location {
    name: string;
    location: string;
    inhabitants: number;
    tags: string[];
    image: string;
}

interface Destination {
    name: string;
    state: string;
    country: string;
    description: string;
    image: string;
}

interface CarouselDestination extends Destination {
    quote: string;
    tags: string[];
    season: string;
    recommendedDuration: string;
    price: string;
}

interface PopularDestinationsData {
    destinations: Destination[];
}

interface ContinentContent {
    title: string;
    titleIcon: string;
    description: string;
    subtitle: string;
    buttonText: string;
}

interface ContinentData {
    content: ContinentContent;
    locations: Location[];
}

interface DiscoverPageProps {
    popularDestinations: Destination[];
    carouselDestinations: CarouselDestination[];
    europeanData: ContinentData;
    northAmericanData: ContinentData;
    southAmericanData: ContinentData;
    asianData: ContinentData;
}

// Helper function to read JSON files
const readJsonFile = (filePath: string) => {
    const fullPath = path.join(process.cwd(), 'public/data', filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
};

// Default content for error handling
const defaultContinentData: ContinentData = {
    content: {
        title: "",
        titleIcon : "",
        description: "",
        subtitle: "",
        buttonText: "Learn more"
    },
    locations: []
};

export const getStaticProps: GetStaticProps<DiscoverPageProps> = async () => {
    try {
        // Read and parse all JSON files
        const popularData = readJsonFile('discovery-data/discoveryPage-popular-destinations-data.json') as PopularDestinationsData;
        const carouselData = readJsonFile('discovery-data/discoveryPage-carousel-destinations-data.json') as CarouselDestination[];
        const europeanData = readJsonFile('discovery-data/discoveryPage-european-locations-data.json') as ContinentData;
        const northAmericanData = readJsonFile('discovery-data/discoveryPage-nAmerican-locations-data.json') as ContinentData;
        const southAmericanData = readJsonFile('discovery-data/discoveryPage-sAmerican-locations-data.json') as ContinentData;
        const asianData = readJsonFile('discovery-data/discoveryPage-asian-locations-data.json') as ContinentData;

        return {
            props: {
                popularDestinations: popularData?.destinations || [],
                carouselDestinations: Array.isArray(carouselData) ? carouselData : [],
                europeanData: europeanData || defaultContinentData,
                northAmericanData: northAmericanData || defaultContinentData,
                southAmericanData: southAmericanData || defaultContinentData,
                asianData: asianData || defaultContinentData
            },
            revalidate: 3600, // Revalidate every hour
        };
    } catch (error) {
        console.error('Error loading data:', error);
        return {
            props: {
                popularDestinations: [],
                carouselDestinations: [],
                europeanData: defaultContinentData,
                northAmericanData: defaultContinentData,
                southAmericanData: defaultContinentData,
                asianData: defaultContinentData
            },
        };
    }
};

export default function Discover({
                                     popularDestinations,
                                     carouselDestinations,
                                     europeanData,
                                     northAmericanData,
                                     southAmericanData,
                                     asianData,
                                 }: DiscoverPageProps) {
    return (
        <div>
            <Header/>
            <section>
                <DiscoverHeadCarrousel destinations={carouselDestinations}/>
            </section>
            <section style={{
                backgroundColor: '#84DCC6'
            }}>
                <div className="p-12 px-32 mx-12">
                    <h1 className="text-center mb-12 mt-8 md:text-3xl font-bold">MOST POPULAR THIS MONTH</h1>
                    <div className="grid grid-cols-4 gap-12">
                        {Array.isArray(popularDestinations) && popularDestinations.map((destination, index) => (
                            <DiscoverDestinationInfoCardComponent
                                key={`${destination.name}-${index}`}
                                destination={destination}
                            />
                        ))}
                    </div>
                    <div className="text-3xl text-center mt-8">- - -</div>
                </div>
            </section>
            <section>
                <img
                    src="https://img.freepik.com/free-vector/paper-airplane-send-with-dotted-lines-flat-style_78370-2884.jpg"
                    alt="title image"
                    className="w-64 mt-32 ml-12"
                />
            </section>
            <section className="ml-48 border-t-3 border-b-3 border-l-3 rounded-l-3xl mb-32">
                <DiscoverContinents
                    direction="ltr"
                    title={europeanData.content.title}
                    titleIcon={europeanData.content.titleIcon}
                    description={europeanData.content.description}
                    subtitle={europeanData.content.subtitle}
                    buttonText={europeanData.content.buttonText}
                    onButtonClick={() => console.log("Button clicked")}
                    locations={europeanData.locations}
                />
            </section>
            <section className="mr-48 border-t-3 border-b-3 border-r-3 rounded-r-3xl mt-32 mb-32">
                <DiscoverContinents
                    direction="rtl"
                    title={northAmericanData.content.title}
                    titleIcon={northAmericanData.content.titleIcon}
                    description={northAmericanData.content.description}
                    subtitle={northAmericanData.content.subtitle}
                    buttonText={northAmericanData.content.buttonText}
                    onButtonClick={() => console.log("Button clicked")}
                    locations={northAmericanData.locations}
                />
            </section>
            <section className="ml-48 border-t-3 border-b-3 border-l-3 rounded-l-3xl mt-32 mb-32">
                <DiscoverContinents
                    direction="ltr"
                    title={southAmericanData.content.title}
                    titleIcon={southAmericanData.content.titleIcon}
                    description={southAmericanData.content.description}
                    subtitle={southAmericanData.content.subtitle}
                    buttonText={southAmericanData.content.buttonText}
                    onButtonClick={() => console.log("Button clicked")}
                    locations={southAmericanData.locations}
                />
            </section>
            <section className="mr-48 border-t-3 border-b-3 border-r-3 rounded-r-3xl mt-32">
                <DiscoverContinents
                    direction="rtl"
                    title={asianData.content.title}
                    titleIcon={asianData.content.titleIcon}
                    description={asianData.content.description}
                    subtitle={asianData.content.subtitle}
                    buttonText={asianData.content.buttonText}
                    onButtonClick={() => console.log("Button clicked")}
                    locations={asianData.locations}
                />
            </section>
            <section>
                <img
                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSOLEh8MYSC_igJvSuL41RFvQC4mk7hlPbeY7S-vDsXRrL26DwH"
                    alt="title image"
                    className="w-96 mt-24 ml-auto mr-12"
                />
            </section>
            <Footer/>
        </div>
    );
}