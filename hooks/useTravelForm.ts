import {
  LocationData,
  travelSearchForm,
  TripResult,
} from '@/types/travelSearchForm';
import { useState } from 'react';

function toPascalCase(str: string) {
  return str
    .toLowerCase() // Convierte toda la cadena a minúsculas
    .replace(/(?:^|\s|_|-)(\w)/g, (_match, p1) => p1.toUpperCase()) // Convierte la primera letra de cada palabra a mayúsculas
    .replace(/[\s_-]/g, ''); // Elimina espacios, guiones bajos y guiones
}

function clearData(data: unknown[]): TripResult[] {
  return data.map((entry) => {
    const cleanedEntry: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(
      entry as Record<string, string>,
    )) {
      // Eliminar "::vertex" o "::edge" y parsear el JSON
      const cleanValue = value.split('::')[0];
      cleanedEntry[key] = JSON.parse(cleanValue);
    }

    return cleanedEntry as unknown as TripResult;
  });
}

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    setIsLoading(true);
    const requestData = {
      ciudad_origen: toPascalCase(formState.originResults[0]?.name),
      ciudad_destino: toPascalCase(formState.destResults[0]?.name),
      pais: '',
      tipo_ruta: String(Array.from(selectedModes).pop()),
      fecha: departureDate?.toString(),
      precio_billete: null,
      distancia: null,
      duracion: null,
    };

    try {
      const response = await fetch('http://localhost:8000/trip/viaje_filtro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        setError('Failed to fetch data from API');
      }

      const responseData = await response.json();
      const cleanResponse = clearData(responseData);
      setFormState((prev) => ({ ...prev, tripResults: cleanResponse }));
    } catch (error) {
      setError(`Error during API request: ${error}`);
      console.error('Error during API request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...formState,
    error,
    isLoading,
    handleSearch,
    setFormState,
  };
};
