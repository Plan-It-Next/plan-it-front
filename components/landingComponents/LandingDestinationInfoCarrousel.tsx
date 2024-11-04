import React, { useState, useEffect } from 'react';
import DestinationInfoCardComponent from '../commons/DestinationInfoCardComponent';

const destinations = [
    {
        mainImage: {
            url: "https://upload.wikimedia.org/wikipedia/commons/1/14/L%27Umbracle%2C_Valencia%2C_Spain_-_Jan_2007.jpg",
            alt: "Valencia main image"
        },
        title: "Valencia",
        location: "Spain",
        description: "Valencia, a lively city on Spain's Mediterranean coast, is the perfect mix of history, modern flair, and sun-soaked beaches. Stroll through the charming old town filled with Gothic and Baroque gems, marvel at the futuristic City of Arts and Sciences, or simply unwind on the sandy shores of Malvarrosa Beach. With its vibrant food scene – including the world-famous paella – bustling markets, and exciting festivals like Las Fallas, Valencia offers something special for every traveler looking for culture, adventure, or a bit of both.",
        highlights: [
            {
                icon: "🏰",
                title: "Explore Historic Old Town",
                description: "Wander through cobbled streets, discover Gothic cathedrals, and beautiful plazas."
            },
            {
                icon: "🖼️",
                title: "Visit the City of Arts and Sciences",
                description: "Dive into futuristic architecture, an oceanographic park, and fascinating museums."
            },
            {
                icon: "🎉",
                title: "Join the Festivities",
                description: "Experience the excitement of Las Fallas, Valencia's famous fire festival!"
            },
            {
                icon: "🌊",
                title: "Relax at Pata cona and Malvarrosa Beach",
                description: "Soak up the sun or enjoy a beachside café with stunning sea views."
            }
        ],
        galleryImages: [
            {
                url: "https://www.spain.info/.content/images/cabeceras-grandes/comunidad-valenciana/ciudad-artes-ciencias-noche-valencia-pexel256150.jpg",
                alt: "ciudad de ciencias"
            },
            {
                url: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/342000/342700-Valencia-Cathedral.jpg",
                alt: "old city streets"
            },
            {
                url: "https://www.spain.info/.content/imagenes/cabeceras-grandes/valencia/torres_serranos_valencia_s_617340992.jpg",
                alt: "old city streets"
            },
            {
                url: "https://www.pichiavo.com/wp-content/uploads/2021/06/Pichiavo-Fallas-Valencia-1.jpg",
                alt: "old city streets"
            }
        ]
    },
    {
        mainImage: {
            url: "https://leverage-experts.com/wp-content/uploads/2022/09/david-rodrigo-Fr6zexbmjmc-unsplash.jpg",
            alt: "Barcelona main image"
        },
        title: "Dubai",
        location: "UAE",
        description: "Tokyo, Japan’s vibrant capital, is a city where futuristic innovation meets deep-rooted tradition. Wander through neon-lit streets, explore ancient temples, and immerse yourself in cutting-edge technology in a single day. Discover serene gardens and historic shrines alongside towering skyscrapers and bustling districts filled with fashion, food, and entertainment. Whether you’re drawn by Tokyo’s culinary delights, cherry blossoms, or lively neighborhoods, the city offers an unforgettable blend of old and new.",
        highlights: [
            {
                icon: "🏙",
                title: "Visit Burj Khalifa",
                description: "Admire breathtaking views from the world’s tallest building."
            },
            {
                icon: "🛍",
                title: "Shop at Dubai Mall",
                description: "Explore the whimsical park filled with colorful mosaics and amazing city views."
            },
            {
                icon: "🐪",
                title: "Desert Safari ",
                description: "Enjoy dune bashing, camel rides, and traditional Bedouin experiences."
            },
            {
                icon: "🎢",
                title: "Have Fun at Dubai Parks",
                description: "Visit thrilling theme parks for family fun."
            }
        ],
        galleryImages: [
            {
                url: "https://www.travelandleisure.com/thmb/k53-FUyx7Uyg1CzpuTuMSZXvY64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67.jpg",
                alt: "Dubai generic"
            },
            {
                url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/50/57/2d/caption.jpg?w=1200&h=700&s=1&cx=1728&cy=1152&chk=v1_c3b95e04b02f1c246e25",
                alt: "Desert safari"
            },
            {
                url: "https://www.civitatis.com/blog/wp-content/uploads/2022/12/panoramica-burj-al-arab-dubai.jpg",
                alt: "Dubai Burj Al Arab"
            },
            {
                url: "https://www.traveltrendstoday.in/wp-content/uploads/2022/10/b3328d966ed7b695cd313f2a847f2407.jpg",
                alt: "Dubai Parks"
            },
            {
                url: "https://cloudfront-eu-central-1.images.arcpublishing.com/thenational/ELYFWMTVPFBGZI425A3JOSJY2E.jpg",
                alt: "Dubai Restaurant"
            }
        ]
    },
    {
        mainImage: {
            url: "https://assets.editorial.aetnd.com/uploads/2013/07/gettyimages-1390815938.jpg",
            alt: "Tokyo main image"
        },
        title: "Tokyo",
        location: "Japan",
        description: "Tokyo, Japan’s vibrant capital, is a city where futuristic innovation meets deep-rooted tradition. Wander through neon-lit streets, explore ancient temples, and immerse yourself in cutting-edge technology all in a single day. Discover the city’s serene gardens and historic shrines alongside towering skyscrapers and bustling districts filled with fashion, food, and entertainment. Whether you're captivated by Tokyo’s culinary delights, seasonal cherry blossoms, or the energy of its lively neighborhoods, Tokyo offers an extraordinary blend of the old and new, promising unforgettable experiences for every traveler.",
        highlights: [
            {
                icon: "🏯",
                title: "Explore Asakusa and Senso-ji Temple",
                description: "Discover Tokyo's oldest temple and traditional markets."
            },
            {
                icon: "🗼",
                title: "Visit Tokyo Tower and Tokyo Skytree",
                description: "Enjoy panoramic views of the city skyline."
            },
            {
                icon: "🌸",
                title: "Stroll in Ueno Park",
                description: "See beautiful cherry blossoms in spring or visit museums year-round."
            },
            {
                icon: "🛍",
                title: "Shop in Shibuya and Harajuku ",
                description: "Experience the latest fashion trends and unique street style."
            }
        ],
        galleryImages: [
            {
                url: "https://www.civitatis.com/f/japon/tokio/free-tour-asakusa-589x392.jpg",
                alt: "Asakusa Senso-Ji temple"
            },
            {
                url: "https://media.istockphoto.com/id/669545870/es/foto/torre-de-tokio-jap%C3%B3n-tokio-ciudad-horizonte-y-paisaje-urbano.jpg?s=612x612&w=0&k=20&c=c1ErayraBWN6ChOhKoaydC06z90QGzKjfTX3Xtv_s-c=",
                alt: "Tokyo Tower"
            },
            {
                url: "https://t4.ftcdn.net/jpg/01/46/00/45/360_F_146004549_GmEznhyRDxroExuuApay4mLJ0TOheqck.jpg",
                alt: "Ueno Park"
            },
            {
                url: "https://www.gotokyo.org/en/destinations/western-tokyo/shibuya/images/main.jpg",
                alt: "Shibuya"
            },
            {
                url: "https://byfood.b-cdn.net/api/public/assets/9544/content",
                alt: "Tokyo streets"
            }
        ]
    },
    {
        mainImage: {
            url: "https://www.tripsavvy.com/thmb/UfG0_2WB67pErEqfIQMvEjV4W20=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-947698310-1729da81e58f40058a9e45ba82532d57-2f992696318c42cbbd595ef3ec1043fd.jpg",
            alt: "Los Angeles main image"
        },
        title: "Los Angeles",
        location: "USA",
        description: "Los Angeles, the entertainment capital of the world, is a city of dreams where sunny beaches, Hollywood glamour, and diverse neighborhoods come together. From the iconic Hollywood Sign and star-studded Walk of Fame to scenic hikes and world-class museums, LA offers a vibrant mix of culture, creativity, and natural beauty. Whether you’re chasing the thrill of movie magic or relaxing on the coast, Los Angeles promises something for every traveler.",
        highlights: [
            {
                icon: "🎬",
                title: "Walk the Hollywood Walk of Fame",
                description: "Spot your favorite stars along this iconic boulevard."
            },
            {
                icon: "🏖",
                title: "Relax at Santa Monica Beach",
                description: "Enjoy the sandy shores and lively pier."
            },
            {
                icon: "🎨",
                title: "Explore The Getty Center ",
                description: "Discover art, architecture, and gardens with stunning city views."
            },
            {
                icon: "🌄",
                title: "Hike in Griffith Park",
                description: "Take a scenic hike and get up-close views of the Hollywood Sign."
            }
        ],
        galleryImages: [
            {
                url: "https://skift.com/wp-content/uploads/2023/12/de-andre-bush-eoohqHDVEP0-unsplash.jpg",
                alt: "Hollywood sign"
            },
            {
                url: "https://www.visittheusa.mx/sites/default/files/styles/hero_l/public/images/hero_media_image/2022-03/e572efa58c0e4bfedbae7200e7990772.jpeg?h=bcf9f3f0&itok=An4P1Hh1",
                alt: "Santa Monica beach"
            },
            {
                url: "https://griffithobservatory.org/wp-content/uploads/2021/03/cameron-venti-c5GkEd-j5vI-unsplash_noCautionTape.jpg",
                alt: "Griffith observatory"
            },
            {
                url: "https://media.timeout.com/images/105485851/image.jpg",
                alt: "Rodeo drive"
            },
            {
                url: "https://static1.squarespace.com/static/5eb1e180d1aaaa079bb58596/t/604aa10800aa8e4b534fc34e/1615503626770/STUDIOpractice-the-getty-center-1.jpg",
                alt: "Getty Center"
            },
        ]
    }
];

const DestinationCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === destinations.length - 1 ? 0 : prevIndex + 1
            );
        }, 20000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="w-full transition-opacity duration-500">
                <DestinationInfoCardComponent {...destinations[currentIndex]} />
            </div>

            {/* Dots indicator with more spacing */}
            <div className="flex gap-4 mt-4">
                {destinations.map((_, index) => (
                    <button
                        key={index}
                        className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                        } hover:bg-blue-400`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DestinationCarousel;