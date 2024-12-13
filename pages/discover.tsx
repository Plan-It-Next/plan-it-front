import Header from '../components/commons/header/HeaderComponent';
import DiscoverDestinationInfoCardComponent from "@/components/commons/DiscoverDestinationInfoCardComponent";
import DiscoverHeadCarrousel from "@/components/discoverComponents/DiscoverHeadCarrousel";
import Footer from "@/components/commons/FooterComponent";
import DiscoverContinents from "@/components/discoverComponents/DiscoverContinents";

const destinations = [
    {
        name: "SPLIT",
        state: "Dalmatia",
        country: "Croatia",
        description: "Experience the perfect blend of ancient history and modern life in this stunning coastal city.",
        image: "https://homerent.agency/storage/app/uploads/public/640/c1f/48a/640c1f48a3efc462458354.jpg"
    },
    {
        name: "NAXOS",
        state: "Ciclada",
        country: "Greece",
        description: "An island where ancient history, stunning beaches, and charming villages come together.",
        image: "https://di262mgurvkjm.cloudfront.net/d3337a14-7345-4874-afed-c5beac102f87/R39361-FR-01_uxga.jpg"
    },
    {
        name: "BUDAPEST",
        state: "Pest",
        country: "Hungary",
        description: "Home to stunning architecture, thermal baths, and rich history, a must-visit in Central Europe.",
        image: "https://media.traveler.es/photos/6137750b70e3cff8b85f93d7/master/w_1600%2Cc_limit/113886.jpg"
    },
    {
        name: "GRANADA",
        state: "Andalucia",
        country: "Spain",
        description: "A city full of history, a blend of snow-capped mountains, historic charm, and festive atmosphere.",
        image: "https://visit-andalucia.com/article_images/granadainwinter/visiting-granada-in-winter.webp"
    }
];

const europeanLocations = [
    {
        "name": "PARIS",
        "location": "France, Europe",
        "inhabitants": 2161000,
        "tags": ["Culture", "Architecture", "Gastronomy"],
        "image": "https://img.static-kl.com/images/media/71BBFEDE-473D-4F4E-82522A2197279310"
    },
    {
        "name": "ROME",
        "location": "Italy, Europe",
        "inhabitants": 2873000,
        "tags": ["History", "Art", "Cuisine"],
        "image": "https://media.gq-magazine.co.uk/photos/5d13a3a9b6fee91a87c9f87f/16:9/w_2560%2Cc_limit/Rome-hp-GQ-24May16_istock_b.jpg"
    },
    {
        "name": "BERLIN",
        "location": "Germany, Europe",
        "inhabitants": 3769000,
        "tags": ["Modernity", "Nightlife", "Museums"],
        "image": "https://img.freepik.com/fotos-premium/berlin-alemania-junio-vista-aerea-horizonte-berlin-centro-ciudad_662214-313370.jpg"
    },
    {
        "name": "MADRID",
        "location": "Spain, Europe",
        "inhabitants": 3266000,
        "tags": ["Art", "Football", "Flamenco"],
        "image": "https://media.cntraveler.com/photos/6717c243f1348ea41c7b6319/4:3/w_1884,h_1413,c_limit/madrid-GettyImages-1837573680.jpg"
    },
    {
        "name": "AMSTERDAM",
        "location": "Netherlands, Europe",
        "inhabitants": 872700,
        "tags": ["Canals", "Cycling", "Art"],
        "image": "https://dam.ngenespanol.com/wp-content/uploads/2021/08/GettyImages-1074635276.jpg"
    }
];

const northAmericanLocations = [
    {
        "name": "NEW YORK",
        "location": "USA, North America",
        "inhabitants": 8419600,
        "tags": ["Culture", "Finance", "Broadway"],
        "image": "https://hips.hearstapps.com/hmg-prod/images/nueva-york-1521191396.jpg"
    },
    {
        "name": "MEXICO CITY",
        "location": "Mexico, North America",
        "inhabitants": 8918653,
        "tags": ["History", "Cuisine", "Art"],
        "image": "https://media.cntraveler.com/photos/640b605c63c7e54952eb4d22/4:3/w_1600%2Ch_1200%2Cc_limit/Mexico%2520City_GettyImages-638920569.jpg"
    },
    {
        "name": "TORONTO",
        "location": "Canada, North America",
        "inhabitants": 2731571,
        "tags": ["Multicultural", "Shopping", "Skyscrapers"],
        "image": "https://www.airtransat.com/getmedia/05512380-40c3-432e-8cb6-01b34c7f68c6/Toronto_Showbox_Mobile_800x1000_V3.jpg?width=720"
    },
    {
        "name": "VANCOUVER",
        "location": "Canada, North America",
        "inhabitants": 631490,
        "tags": ["Nature", "Outdoor Activities", "Technology"],
        "image": "https://content.r9cdn.net/rimg/dimg/75/66/ee80acca-city-6668-16682a32985.jpg?width=1366&height=768&xhint=2877&yhint=2104&crop=true"
    }
];

const southAmericanLocations = [
        {
            "name": "RIO DE JANEIRO",
            "location": "Brazil, South America",
            "inhabitants": 6748000,
            "tags": ["Beaches", "Carnival", "Mountains"],
            "image": "https://media.licdn.com/dms/image/v2/D4D12AQGIM0bqmXqOSw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1690450886964?e=2147483647&v=beta&t=eZxPyOQ9yy8c9MWZSqadEGCb0UVYo642BCA2Q1D07N8"
        },
        {
            "name": "BUENOS AIRES",
            "location": "Argentina, South America",
            "inhabitants": 2890151,
            "tags": ["Tango", "Cuisine", "Architecture"],
            "image": "https://vamospanish.com/wp-content/uploads/live-in-buenos-aires.jpg"
        },
        {
            "name": "LIMA",
            "location": "Peru, South America",
            "inhabitants": 9674000,
            "tags": ["History", "Cuisine", "Coastline"],
            "image": "https://www.enel.com/content/dam/enel-com/immagini/master-azienda_2400x1160/circolar-economy-news_2400x1160/lima_2400x1160.jpg"
        },
        {
            "name": "SANTIAGO",
            "location": "Chile, South America",
            "inhabitants": 7150000,
            "tags": ["Mountains", "Culture", "Wine"],
            "image": "https://www.civitatis.com/blog/wp-content/uploads/2024/09/panorama-santiago-de-chile.jpg"
        },
        {
            "name": "BOGOTÁ",
            "location": "Colombia, South America",
            "inhabitants": 7692000,
            "tags": ["History", "Art", "Coffee"],
            "image": "https://cdn.colombia.com/sdi/2023/02/27/10-lugares-turisticos-en-bogota-que-tienes-que-conocer-1122438.jpg"
        }
];

const asianLocations = [
    {
        "name": "TOKYO",
        "location": "Japan, Asia",
        "inhabitants": 13929286,
        "tags": ["Technology", "Culture", "Fashion"],
        "image": "https://media.cntraveler.com/photos/60341fbad7bd3b27823c9db2/16:9/w_2560%2Cc_limit/Tokyo-2021-GettyImages-1208124099.jpg"
    },
    {
        "name": "BEIJING",
        "location": "China, Asia",
        "inhabitants": 21540000,
        "tags": ["History", "Culture", "Architecture"],
        "image": "https://www.agoda.com/wp-content/uploads/2024/09/Featured-image-Beijing-China-1244x700.jpg"
    },
    {
        "name": "HO CHI MINH CITY",
        "location": "Vietnam, Asia",
        "inhabitants": 8900000,
        "tags": ["History", "Cuisine", "Markets"],
        "image": "https://jet-p-001-delivery.sitecorecontenthub.cloud/api/public/content/8dfrl94jsuif-p1fnxkxwg-4x5?v=6f43c5c4"
    },
    {
        "name": "BANGKOK",
        "location": "Thailand, Asia",
        "inhabitants": 10539000,
        "tags": ["Temples", "Nightlife", "Cuisine"],
        "image": "https://www.fivestars-thailand.com/images/article/display/a_1709046883.jpg"
    },
    {
        "name": "SEOUL",
        "location": "South Korea, Asia",
        "inhabitants": 9776000,
        "tags": ["Technology", "Culture", "Shopping"],
        "image": "https://cdn.britannica.com/57/75757-050-122EC2ED/Changgyong-Palace-background-Seoul.jpg"
    }
];

const carouselDestinations = [
    {
        name: "COLOGNE",
        state: "NORTH RHINE-WESTPHALIA",
        country: "GERMANY",
        quote: "The cathedral is a must-see. Truly a magnificent gem in the heart of Cologne.",
        description: 'Experience the charm of Cologne with its majestic cathedral, lively Rhine promenade, and cozy old town. A perfect blend of history and vibrant culture awaits!',
        tags: [
            'Historic',
            'Traditional food',
            'Architecture',
            'Arts and museum',
            'Christmas market'
        ],
        season: 'Winter',
        recommendedDuration: '4 days',
        price: '65',
        image: 'https://4kwallpapers.com/images/wallpapers/cologne-cathedral-3440x1440-13552.jpg'
    },
    {
        name: "LA VALETA",
        state: "MALTA",
        country: "MALTA",
        quote: "Stroll through a blend of history, charm, and breathtaking views in the heart of Malta.",
        description: 'Discover the magic of Malta, where ancient history meets crystal-clear seas. Explore its timeless cities, breathtaking coastlines, and vibrant culture—a Mediterranean paradise awaits!',
        tags: [
            'Mild weather',
            'Historic sites',
            'Mediterranean',
            'Local cuisine',
            'UNESCO Heritage'
        ],
        season: 'Winter / Spring',
        recommendedDuration: '4 days',
        price: '137',
        image: 'https://www.civitatis.com/blog/wp-content/uploads/2024/07/shutterstock_2436798831-scaled.jpg'
    }
];

export default function Discover() {
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
                        {destinations.map((destination) => (
                            <DiscoverDestinationInfoCardComponent destination={destination}/>
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
                    title="Discover Europe"
                    description="Europe is a vibrant blend of history, culture, and stunning landscapes. From iconic landmarks and charming cities to diverse cuisines and hidden gems, it promises unforgettable adventures for every traveler."
                    subtitle="Experience the rich history and modern vibrancy of European cities."
                    buttonText="Learn more about Europe"
                    onButtonClick={() => console.log("Button clicked")}
                    locations={europeanLocations}
                />
            </section>
            <section className="mr-48 border-t-3 border-b-3 border-r-3 rounded-r-3xl mt-32 mb-32">
                <DiscoverContinents
                    direction="rtl"
                    title="Discover North America"
                    description="North America offers stunning landscapes, vibrant cities, and rich cultural heritage. From the Grand Canyon and Niagara Falls to New York and Mexico’s ancient ruins, it’s a diverse destination with adventures, history, and cuisine for every traveler."
                    subtitle="Explore the mix of historic charm and lively culture in North American cities."
                    buttonText="Learn more about North America"
                    onButtonClick={() => console.log("Button clicked")}
                    locations={northAmericanLocations}
                />
            </section>
            <section className="ml-48 border-t-3 border-b-3 border-l-3 rounded-l-3xl mt-32 mb-32">
                <DiscoverContinents
                    direction="ltr"
                    title="Discover South America"
                    description="South America boasts stunning landscapes, vibrant cities, and rich cultural diversity. From the Amazon rainforest and Machu Picchu to Patagonia’s rugged beauty, it’s a continent filled with adventure, history, and unique cuisines."
                    subtitle="Experience rich heritage, vibrant cultures, and historic landmarks across the continent."
                    buttonText="Learn more about South America"
                    onButtonClick={() => console.log("Button clicked")}
                    locations={southAmericanLocations}
                />
            </section>
            <section className="mr-48 border-t-3 border-b-3 border-r-3 rounded-r-3xl mt-32">
                <DiscoverContinents
                    direction="rtl"
                    title="Discover Asia"
                    description="Asia offers diverse landscapes, bustling cities, and rich cultural heritage. From the Great Wall of China and the temples of Kyoto to the bustling streets of Bangkok and the serene beauty of Bali, it’s a continent of endless discovery, history, and unique flavors."
                    subtitle="Experience ancient traditions, diverse cultures, and historic landmarks across Asia."
                    buttonText="Learn more about Asia"
                    onButtonClick={() => console.log("Button clicked")}
                    locations={asianLocations}
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