import React from 'react';
import {Card, CardBody, Image} from "@nextui-org/react";

const UnescoHeritageComponent: React.FC = () => {
    return (
        <div>
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-3/5 bg-white">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2xFhcXXye18Ov4PL0o9zDZTf68pGOABX3LA&s"
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
            <div className="w-2/5">

            </div>
        </div>
    )
}

export default UnescoHeritageComponent;