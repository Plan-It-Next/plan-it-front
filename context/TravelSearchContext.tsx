'use client';

import { Selection } from '@nextui-org/react';
import { createContext, ReactElement, useState } from 'react';
import { LocationData, travelSearchForm } from 'travelSearchForm';

const defaultTravelerSearchForm: travelSearchForm = {
    selectedModes: new Set(['plane', 'train']) as Selection,
    originQuery: '',
    destQuery: '',
    originResults: [] as Array<LocationData>,
    destResults: [] as Array<LocationData>,
    isLoadingOrigin: false,
    isLoadingDest: false,
    departureDate: '',
    returnDate: '',
    travelers: 1,
};

export const TravelSearchContext = createContext({});

export interface travelSearchProps {
    children: React.ReactNode;
}

export const TravelSearchProvider = ({ children }: travelSearchProps) => {
    const [travelerSearchForm, setTravelerSearchForm] = useState(
        defaultTravelerSearchForm,
    );

    return (
        <TravelSearchContext.Provider
            value={{ travelerSearchForm, setTravelerSearchForm }}
        >
            {children}
        </TravelSearchContext.Provider>
    );
};
