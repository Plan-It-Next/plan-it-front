import { LocationData, travelSearchForm } from '@/types/travelSearchForm';
import { useState } from 'react';

export const useTravelForm = (props: travelSearchForm = {
    selectedModes: 'all',
    originQuery: '',
    destQuery: '',
    originResults: [] as LocationData[],
    destResults: [] as LocationData[],
    isLoadingOrigin: false,
    isLoadingDest: false,
    departureDate: '',
    returnDate: '',
    travelers: 1,
}) => {
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
    } = props;

    const [formState, setFormState] = useState({
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
    });

    return {
        ...formState,
        setFormState,
    };
};
