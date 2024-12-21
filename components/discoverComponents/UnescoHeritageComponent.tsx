import React from 'react';
import {Button} from "@nextui-org/react";

const UnescoHeritageComponent: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-row items-center">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-1/2 h-full bg-white">
                <img
                    src="https://images.squarespace-cdn.com/content/v1/62feb7a69c66ec0672f20461/1660861691627-RTPKY7WOS51JLDTXF72L/Arequipa-Sunset.jpg"
                    alt="UNESCO Heritage Arequipa Peru"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg"
                    alt="UNESCO Heritage Alhambra Spain"
                    className="object-cover w-full h-full"
                />
                <img
                    src="https://www.connollycove.com/wp-content/uploads/2022/07/Summer-Palace-Beijing-China.jpg"
                    alt="UNESCO Heritage Beijin summer palace"
                    className="object-cover row-span-2 w-full h-full"
                />
                <img
                    src="https://mybestplace.com/uploads/2024/2/Monte-Roraima-Venezuela-SOCIAL-1.jpg"
                    alt="UNESCO Heritage Chichen Itza Mexico"
                    className="object-cover col-span-2 row-start-2 w-full h-full"
                />
                <img
                    src="https://media.traveler.es/photos/64f745b00cb606d22d6ef3b7/4:3/w_4532,h_3399,c_limit/TTNP70.jpg"
                    alt="UNESCO Heritage Mount Saint Michel France"
                    className="object-cover row-start-3 w-full h-full"
                />
                <img
                    src="https://s.inyourpocket.com/gallery/113638.jpg"
                    alt="UNESCO Heritage Centennial Hall Poland"
                    className="object-cover col-span-2 row-start-3 w-full h-full"
                />
            </div>
            <div className="w-1/2 flex flex-row h-full">
                {/* Text content and button container */}
                <div
                    className="p-16 h-[95%] flex flex-col justify-between w-3/4 mt-4 self-center"
                    style={{
                        backgroundColor: '#e2d7f7'
                    }}
                >
                    <div>
                        <h1 className="md:text-6xl font-bold">UNESCO Heritage</h1>
                        <p className="text-2xl italic m-12">Step into the world&apos;s most extraordinary landmarks, where
                            breathtaking landscapes and ancient wonders offer unforgettable experiences and a deep
                            connection to humanity&apos;s history and natural beauty.</p>
                        <p className="mr-2">With over 1,100 sites and countless intangible treasures, the journey is as diverse as
                            humanity itself. From ancient ruins and natural wonders to living traditions and
                            cultural practices, every experience tells a story worth discovering.</p>
                    </div>

                    <Button
                        variant="bordered"
                        className="max-w-fit px-6 py-2 bg-white mt-8"
                        radius="full"
                        onClick={() => {
                            window.open('https://whc.unesco.org/en/list/')
                        }}
                    >
                        Learn more about UNESCO Heritage
                    </Button>
                </div>

                {/* Right side image */}
                <div className="w-1/4 h-full flex items-center justify-center">
                    <img
                        src="/images/caryatid.png"
                        alt="UNESCO decoration"
                        className="object-cover h-full"
                        style={{
                            backgroundColor: '#e2d7f7'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default UnescoHeritageComponent;