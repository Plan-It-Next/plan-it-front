import React, { useState } from 'react';
import { Slider } from "@nextui-org/react";
import {useAuth} from "@/context/AuthContext";

export default function Presupuesto() {
  const [presupuesto, setPresupuesto] = useState(75);
  const [mensaje, setMensaje] = useState(""); // Para mostrar mensajes de éxito o error
  const {user, currentGroup} = useAuth();

  const guardarPresupuesto = async () => {
    if (!currentGroup || !currentGroup.group_id) {
      setMensaje("No perteneces a un grupo");
      setTimeout(() => setMensaje(""), 6000);
      return;
    }
    try {
      const token = localStorage.getItem('token');
    const response = await fetch("http://34.41.98.73/user_group/budget", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: user?.user_id,
        group_id: currentGroup.group_id,
        budget: presupuesto
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message ||'Error updating budget');
    }

    setMensaje("Presupuesto guardado con éxito");
  } catch (error) {
    setMensaje("API no disponible en este momento."+ error);
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
          onChange={(value) => setPresupuesto(Array.isArray(value) ? value[0] : value)}
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
