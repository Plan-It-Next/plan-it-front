// pages/booking.tsx
import { memo, useContext } from 'react';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import BookingSection from '@/components/commons/search/BookingSectionComponent';
import StickySidebar from '@/components/commons/FilterSctickyColumn';
import { TravelSearchContext } from '@/context/TravelSearchContext';
import { TravelCard, TravelType } from '@/components/commons/search/TravelCard';

export default memo(function BookingPage() {
  const { tripResults, isLoading, error } = useContext(TravelSearchContext);
  // const trip = tripResults[0];
  console.table(tripResults);
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

          {tripResults.map((trip) => (
            <TravelCard
              key={trip.relacion.id}
              travelType={
                trip.relacion.properties.tipo === "avion"
                  ? TravelType.AVION
                  : TravelType.TREN
              }
              companyName={
                trip.relacion.properties.tipo === 'tren' ? 'RENFE' : 'IBERIA'
              }
              departureCity={trip.nodo1.properties.ciudad}
              arrivalCity={trip.nodo2.properties.ciudad}
              departureTime={trip.relacion.properties.fecha_hora_salida}
              arrivalTime={trip.relacion.properties.fecha_hora_llegada}
              price={`${trip.relacion.properties.precio_billete}€`}
              duration={trip.relacion.properties.duracion}
            />
          ))}
        </div>

        {/* Columna derecha */}
        <div className="fixed top-0 left-0 w-[300px] h-full">
          <StickySidebar />
        </div>
      </div>
    </div>
  );
});
