import { LocationData, travelSearchForm } from '@/types/travelSearchForm';
import { useState } from 'react';

export const useTravelForm = (
    props: travelSearchForm = {
        selectedModes: new Set(['tren']),
        originQuery: '',
        destQuery: '',
        originResults: [] as LocationData[],
        destResults: [] as LocationData[],
        isLoadingOrigin: false,
        isLoadingDest: false,
        departureDate: null,
        returnDate: null,
        travelers: 1,
        tripResults: [],
    },
) => {
    const {
        destResults,
        isLoadingOrigin,
        departureDate,
        returnDate,
        isLoadingDest,
        travelers,
        destQuery,
        originQuery,
        originResults,
        selectedModes,
        tripResults,
    } = props;

    const [formState, setFormState] = useState<travelSearchForm>({
        selectedModes: selectedModes,
        originQuery: originQuery,
        destQuery: destQuery,
        originResults: originResults,
        destResults: destResults,
        isLoadingOrigin: isLoadingOrigin,
        isLoadingDest: isLoadingDest,
        departureDate: departureDate,
        returnDate: returnDate,
        travelers: travelers,
        tripResults: tripResults,
    });

    return {
        ...formState,
        setFormState,
    };
};
