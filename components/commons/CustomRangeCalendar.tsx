import React, { useState } from "react";
import { RangeCalendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function CustomRangeCalendar() {
  const [selectedDates, setSelectedDates] = useState<{ start: Date; end: Date } | null>(null);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSave = async () => {
    if (!selectedDates || !selectedDates.start || !selectedDates.end) {
      setMessage({ type: "error", text: "No se seleccionaron fechas para enviar a la API." });
      setTimeout(() => setMessage(null), 6000);
      return;
    }

    try {
      // Simulación de envío a la API
      throw new Error("API no disponible."); // Simulación de error
      // await sendDatesToAPI(selectedDates); // Descomenta cuando tengas la API conectada
      setMessage({ type: "success", text: "Guardado correctamente." });
    } catch (error) {
      const formattedDates = `${selectedDates.start.toLocaleDateString("es-ES")} - ${selectedDates.end.toLocaleDateString("es-ES")}`;
      setMessage({
        type: "error",
        text: `No se pudo enviar la/s fecha/s seleccionada/s (${formattedDates}) a la API.`,
      });
    }

    setTimeout(() => setMessage(null), 6000);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">¿En qué fecha quieres viajar?</h2>
      <RangeCalendar
        className="w-full"
        minValue={today(getLocalTimeZone())} // Restringe las fechas anteriores a hoy
        value={selectedDates || undefined}
        onChange={(dates) => {
          setSelectedDates(dates);
        }}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Guardar
      </button>
      {message && (
        <div
          className={`mt-4 p-2 text-center rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
