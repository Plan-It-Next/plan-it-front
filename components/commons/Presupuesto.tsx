import React, { useState } from 'react';
import { Slider } from "@nextui-org/react";

export default function Presupuesto() {
  const [presupuesto, setPresupuesto] = useState(75);
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito o error

  const guardarPresupuesto = async () => {
    try {
      // Simulación de la llamada a la API
      await new Promise((resolve, reject) => setTimeout(() => reject(new Error("API no disponible")), 1000));
      setMensaje("Presupuesto guardado con éxito");
    } catch (error) {
      setMensaje("API no disponible en este momento.");
    }

    // Mostrar el mensaje durante 6 segundos
    setTimeout(() => setMensaje(""), 6000);
  };

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
        <button
          onClick={guardarPresupuesto}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar
        </button>
        {mensaje && (
          <div
            className={`mt-4 text-center ${
              mensaje === "Presupuesto guardado con éxito"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
