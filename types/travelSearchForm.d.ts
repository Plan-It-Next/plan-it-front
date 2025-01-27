import {CalendarDate} from "@nextui-org/react";

export type travelSearchForm = {
    origin: number[];
    destiny: number[];
    passengers: number;
    departureDate: CalendarDate | null;
    returnDate: CalendarDate | null;
    transportMode: string;
};