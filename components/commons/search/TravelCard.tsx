import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Chip,
} from '@nextui-org/react';

/**
 * Enumeración para los tipos de viaje soportados.
 */
export enum TravelType {
  TREN = 'Tren',
  AVION = 'Avión',
}

/**
 * Definimos la interfaz para las props del componente TravelCard.
 */
export interface TravelCardProps {
  travelType?: TravelType;
  companyName?: string;
  departureCity?: string;
  arrivalCity?: string;
  departureTime?: string;
  arrivalTime?: string;
  seatClass?: string;
  price?: string;
  duration?: number;
}

const getFormatDate = (dateStr: string): string => {
  let date = new Date(dateStr)
  if (date < new Date()) date = new Date()

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Returns day as 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month so add 1
  const year = date.getFullYear();

  // Format as DD/MM/YYYY
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const getFormatTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  // Get hours and minutes, and pad them with a leading zero if necessary
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

export const TravelCard: React.FC<TravelCardProps> = ({
  travelType = TravelType.TREN,
  companyName = 'Ferrovías',
  departureCity = 'Valencia',
  arrivalCity = 'Madrid',
  departureTime = "2025-01-06T16:20:00.000Z",
  arrivalTime = "2025-01-11T08:30:00.000Z",
  seatClass = 'Turista',
  price = '75€',
  duration = 5,
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 mb-4">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {travelType === TravelType.AVION ? '✈️' : '🚂'}
              {companyName}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            📅 {`${getFormatDate(departureTime)}`}
          </span>
        </div>
        <Chip color="primary" variant="flat" className="capitalize">
          {seatClass}
        </Chip>
      </CardHeader>

      <Divider />

      <CardBody className="py-4">
        <div className="flex justify-between items-center py-2">
          {/* Columna de Salida */}
          <div className="flex flex-col items-start px-6">
            <span className="text-sm text-gray-500">Salida</span>
            <span className="text-xl font-bold">{`${getFormatTime(departureTime)}`}</span>
            <span className="text-base font-medium">{departureCity}</span>
          </div>

          {/* Columna Central - Duración */}
          <div className="flex flex-col items-center px-4">
            <span className="text-sm text-gray-500">Duración</span>
            <span className="text-sm font-medium">{`${duration}h`}</span>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-[600px] h-0.5 bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>

          {/* Columna de Llegada */}
          <div className="flex flex-col items-end px-6">
            <span className="text-sm text-gray-500">Llegada</span>
            <span className="text-xl font-bold">{`${getFormatTime(arrivalTime)}`}</span>
            <span className="text-base font-medium">{arrivalCity}</span>
          </div>
        </div>
      </CardBody>

      <Divider />

      <CardFooter className="flex justify-between items-center py-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Precio total</span>
          <span className="text-2xl font-bold text-primary">{price}</span>
        </div>
        <Button color="primary" size="lg" className="font-semibold">
          Reservar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TravelCard;
