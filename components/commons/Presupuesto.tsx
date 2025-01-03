import React, { useState } from 'react';
import { Slider } from "@nextui-org/react";

export default function Presupuesto() {
  const [presupuesto, setPresupuesto] = useState(75);

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">¿Cuál es tu Presupuesto?</h2>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-blue-600">{presupuesto} €</span>
        <Slider
          className="w-full mt-4"
          defaultValue={presupuesto}
          onChange={(value) => setPresupuesto(value)}
          minValue={35}
          maxValue={2000}
          step={5}
        />
      </div>
    </div>
  );
}