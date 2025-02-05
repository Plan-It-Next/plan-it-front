import React, { useState } from "react";
import {DateValue, RangeCalendar} from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function CustomRangeCalendar() {
  const [selectedDates, setSelectedDates] = useState<{ start: DateValue; end: DateValue } | null>(null);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSave = async () => {
    if (!selectedDates) {
      console.log("Error: No se seleccionaron fechas para enviar a la API.");
      setMessage({ type: "error", text: "No se seleccionaron fechas para enviar a la API." });
      setTimeout(() => setMessage(null), 6000);
      return;
    }

    console.log("Intentando enviar las fechas seleccionadas a la API:", selectedDates);

    try {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:8000/calendar/add_day", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        start_date: selectedDates.start.toString(),
        end_date: selectedDates.end.toString()
      }),
    });

    if (!response.ok) {
      throw new Error('Error guardando fechas');
    }

    setMessage({ type: "success", text: "Guardado correctamente." });
  } catch (error) {
    setMessage({
      type: "error",
      text: `No se pudo enviar la/s fecha/s seleccionada/s a la API.`,
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
        onChange={(dateRange) => {
          setSelectedDates(dateRange ? {
            start: dateRange.start,
            end: dateRange.end
          }:null);
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
