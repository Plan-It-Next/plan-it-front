import React from 'react';
import Header from "@/components/commons/header/HeaderComponent";
import LugaresGuardados from '@/components/commons/LugaresGuardados';
import Presupuesto from '@/components/commons/Presupuesto';
import CustomRangeCalendar from '@/components/commons/CustomRangeCalendar';

export default function Group() {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            <LugaresGuardados />
            <Presupuesto />
            <CustomRangeCalendar />
          </div>
        </div>
      </div>
    );
  }