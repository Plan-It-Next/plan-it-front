'use client'

import {createContext, ReactElement, useState} from "react";
import {travelSearchForm} from "travelSearchForm";

const defaultTravelerSearchForm: travelSearchForm = {
    origin: [],
    destiny: [],
    passengers: 1,
    departureDate: null,
    returnDate: null,
    transportMode: ""
};

export const TravelSearchContext = createContext({});

export interface travelSearchProps {children: ReactElement}

export const TravelSearchProvider = ({children}: travelSearchProps) => {
    const [travelerSearchForm, setTravelerSearchForm] = useState(defaultTravelerSearchForm);

    return (
        <TravelSearchContext.Provider value={{travelerSearchForm, setTravelerSearchForm}}>
            {children}
        </TravelSearchContext.Provider>
    );
}