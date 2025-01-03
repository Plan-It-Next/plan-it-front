import React from 'react';
import { Button } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export default function LugaresGuardados() {
  const lugares = [
    { ciudad: "Tokio, Japón" },
    { ciudad: "Cuenca, España" },
    { ciudad: "Múnich, Alemania" },
  ];

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Lugares Guardados</h2>
      <ul>
        {lugares.map((lugar, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{lugar.ciudad}</span>
            <div className="flex space-x-2">
              <Button size="sm" color="error" className="p-2">
                <Icon icon="mdi:heart" className="text-lg" />
              </Button>
              <Button size="sm" color="primary" className="p-2">
                <Icon icon="mdi:circle-outline" className="text-lg" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}