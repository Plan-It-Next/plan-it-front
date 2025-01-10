import { useTravelForm } from '@/hooks/useTravelForm';
import { travelSearchForm } from '@/types/travelSearchForm';
import React, { createContext, useState } from 'react';

export const TravelSearchContext = createContext({} as travelSearchForm & ReturnType<typeof useState<travelSearchForm>>[1]);

export interface travelSearchProps {
    children: React.ReactNode;
}

export const TravelSearchProvider = ({ children }: travelSearchProps) => {
    const {
        selectedModes,
        travelers,
        returnDate,
        departureDate,
        isLoadingDest,
        isLoadingOrigin,
        destResults,
        originResults,
        destQuery,
        originQuery,
        setFormState,
    } = useTravelForm();

    return (
        <TravelSearchContext.Provider
            value={{
                selectedModes,
                travelers,
                returnDate,
                departureDate,
                isLoadingDest,
                isLoadingOrigin,
                destResults,
                originResults,
                destQuery,
                originQuery,
                setFormState,
            }}
        >
            {children}
        </TravelSearchContext.Provider>
    );
};
