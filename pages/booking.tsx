// pages/booking.tsx
import { useContext } from 'react';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import BookingSection from '@/components/commons/search/BookingSectionComponent';
import StickySidebar from '@/components/commons/FilterSctickyColumn';
import { TravelSearchContext } from '@/context/TravelSearchContext';
import { TravelCard, TravelType } from '@/components/commons/search/TravelCard';

export default function BookingPage() {
  // Recuperar vuelos del contexto que los rellenará el BookingSectionComponent

  const { tripResults, isLoading, error } = useContext(TravelSearchContext);
  // const [firstTrip] = tripResults;
  // const { nodo1: origin, relacion: route, nodo2: destination } = firstTrip;

  // const formatDateTime = (dateString: string) => {
  //   return new Date(dateString).toLocaleString('en-US', {
  //     weekday: 'short',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   });
  // };

  // const formatDuration = (duration: string) => {
  //   const hours = duration.match(/(\d+)H/)?.[1] || '0';
  //   const minutes = duration.match(/(\d+)M/)?.[1] || '0';
  //   return `${hours}h ${minutes}m`;
  // };

  const trip = tripResults[0];
  return (
    <div className="container mx-auto p-4">
      <div className="px-24 mt-8 flex relative">
        {/* Columna izquierda */}
        <div className="flex-1 ml-[320px]">
          <Card className="mb-6">
            <CardBody>
              <BookingSection />
            </CardBody>
          </Card>

          {isLoading && <Spinner className="mt-8" />}
          {error && <div className="mt-8 text-red-500">{error}</div>}

          <TravelCard
            key={trip.nodo1.id}
            travelType={TravelType.TREN}
            companyName={'Renfe'}
            departureCity={trip.nodo1.properties.ciudad}
            // arrivalCity={trip.nodo2.properties.ciudad}
            // departureTime={trip.relacion.properties.fecha_hora_salida}
            arrivalTime={trip.relacion.properties.fecha_hora_llegada}
            price={`${trip.relacion.properties.precio_billete}€`}
            duration={trip.relacion.properties.duracion}
          />
        </div>

        {/* Columna derecha */}
        <div className="fixed top-0 left-0 w-[300px] h-full">
          <StickySidebar />
        </div>
      </div>
    </div>
  );
}
