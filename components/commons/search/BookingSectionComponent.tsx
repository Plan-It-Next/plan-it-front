import React, { useEffect, useContext } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Card,
  CardBody,
  DatePicker,
  Button,
  Input,
  Selection,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import Amadeus from 'amadeus';
import { TravelSearchContext } from '@/context/TravelSearchContext';
import { TripResult } from '@/types/travelSearchForm';

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_ID || '',
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET || '',
});

const transportModes = [
  { value: 'avion', label: 'Plane' },
  { value: 'tren', label: 'Train' },
  { value: 'bus', label: 'Bus' },
  { value: 'ferry', label: 'Ferry' },
];

const BookingSection: React.FC = () => {
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
    handleSearch,
    setFormState,
  } = useContext(TravelSearchContext);

  const searchLocations = async (query: string, isOrigin: boolean) => {
    if (query.length < 2) {
      if (isOrigin) {
        setFormState((prevState) => ({
          ...prevState,
          originResults: [],
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          destResults: [],
        }));
      }
      return;
    }

    if (isOrigin) {
      setFormState((prevState) => ({
        ...prevState,
        isLoadingOrigin: true,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        isLoadingDest: true,
      }));
    }

    try {
      const response = await amadeus.referenceData.locations.get({
        keyword: query,
        subType: 'CITY',
        'page[limit]': 10,
      });

      if (isOrigin) {
        setFormState((prevState) => ({
          ...prevState,
          originResults: response.data,
          isLoadingOrigin: false,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          destResults: response.data,
          isLoadingDest: false,
        }));
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      if (isOrigin) {
        setFormState((prevState) => ({
          ...prevState,
          isLoadingOrigin: false,
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          isLoadingDest: false,
        }));
      }
    }
  };

  useEffect(() => {
    searchLocations(originQuery, true);
  }, [originQuery]);

  useEffect(() => {
    searchLocations(destQuery, false);
  }, [destQuery]);

  const handleSelectionChange = (newSelection: Selection) => {
    // if (newSelection === 'all' || newSelection.size > 0) {
    setFormState((prevState) => ({
      ...prevState,
      selectedModes: newSelection,
    }));
    // }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <Autocomplete
            label="Origin"
            placeholder="Origin city"
            className="h-full mt-2"
            onInputChange={(value) =>
              setFormState((prevState) => ({
                ...prevState,
                originQuery: value,
              }))
            }
            isLoading={isLoadingOrigin}
            items={originResults}
            inputValue={originResults[0]?.name}
          >
            {(location) => (
              <AutocompleteItem
                key={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                value={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                textValue={location.address.cityName}
              >
                <div className="flex flex-col">
                  <span className="text-sm">
                    {location.address.cityName} | {location.iataCode}
                  </span>
                  <span className="text-xs text-gray-500">
                    {location.address.countryName}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            label="Destination"
            placeholder="Destination city"
            className="h-full mt-2"
            onInputChange={(value) =>
              setFormState((prevState) => ({
                ...prevState,
                destQuery: value,
              }))
            }
            isLoading={isLoadingDest}
            inputValue={destResults[0]?.name}
          >
            {destResults.map((location) => (
              <AutocompleteItem
                key={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                value={`${location.geoCode.latitude};${location.geoCode.longitude}`}
                textValue={location.address.cityName}
              >
                <div className="flex flex-col">
                  <span className="text-sm">
                    {location.address.cityName} | {location.iataCode}
                  </span>
                  <span className="text-xs text-gray-500">
                    {location.address.countryName}
                  </span>
                </div>
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <DatePicker
            label="Departure"
            isRequired
            className="mt-2"
            onChange={(date) =>
              setFormState((prevState) => ({
                ...prevState,
                departureDate: date,
              }))
            }
            value={departureDate}
          />
          <DatePicker
            label="Return"
            className="mt-2"
            onChange={(date) =>
              setFormState((prevState) => ({
                ...prevState,
                returnDate: date,
              }))
            }
            value={returnDate}
          />
        </div>
        <Card>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="number"
              label="Travelers"
              value={travelers + ''}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  travelers: Number(e.target.value),
                }))
              }
            />
            <Select
              label="Transport Modes"
              placeholder="Select transport modes"
              selectionMode="multiple"
              // selectedKeys={['tren']}
              onSelectionChange={handleSelectionChange}
              className="w-full"
            >
              {transportModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value}>
                  {mode.label}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-end mt-4">
        <Button color="primary" size="lg" onClick={handleSearch}>
          <Icon icon="mdi:magnify" className="mr-1" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default BookingSection;
