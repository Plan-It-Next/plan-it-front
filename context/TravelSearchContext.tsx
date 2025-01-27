import { useTravelForm } from '@/hooks/useTravelForm';
import { travelSearchForm } from '@/types/travelSearchForm';
import React, { createContext } from 'react';

export const TravelSearchContext = createContext(
    {} as travelSearchForm & {
        setFormState: React.Dispatch<React.SetStateAction<travelSearchForm>>;
    },
);

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
        tripResults,
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
                tripResults,
                setFormState,
            }}
        >
            {children}
        </TravelSearchContext.Provider>
    );
};
