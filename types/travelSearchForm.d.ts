import { DateValue, Selection } from '@nextui-org/react';

export interface travelSearchForm {
    selectedModes: Selection;
    originQuery: string;
    destQuery: string;
    originResults: Array<LocationData>;
    destResults: Array<LocationData>;
    isLoadingOrigin: boolean;
    isLoadingDest: boolean;
    departureDate: DateValue | null;
    returnDate: DateValue | null;
    travelers: number;
    tripResults: TripResult[];
}

export interface LocationData {
    name: string;
    address: {
        countryName: string;
        cityName: string;
    };
    iataCode: string;
    geoCode: {
        latitude: string;
        longitude: string;
    };
    subType: string;
}

export interface TripResult {
    nodo1: Nodo;
    relacion: Relacion;
    nodo2: Nodo;
}

export interface Nodo {
    id: number;
    label: string;
    properties: NodoProperties;
}

export interface NodoProperties {
    id: number;
    pais: string;
    tipo: string;
    ciudad: string;
    nombre: string;
    latitud: number;
    longitud: number;
}

export interface Relacion {
    id: number;
    label: string;
    end_id: number;
    start_id: number;
    properties: RelacionProperties;
}

export interface RelacionProperties {
    id: number;
    tipo: string;
    duracion: number;
    distancia?: number;
    precio_billete: number;
    fecha_hora_salida: string;
    fecha_hora_llegada: string;
}
