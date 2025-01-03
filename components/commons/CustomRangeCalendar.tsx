import React from 'react';
import { RangeCalendar } from "@nextui-org/react";

export default function CustomRangeCalendar() {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">¿En qué fecha quieres viajar?</h2>
      <RangeCalendar className="w-full" />
    </div>
  );
}