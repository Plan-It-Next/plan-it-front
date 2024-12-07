import React, { useState, useEffect, useContext } from "react";
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
} from "@nextui-org/react";
import { Selection } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Amadeus from "amadeus";
import { TravelSearchContext } from "@/context/TravelSearchContext";

const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_ID || "",
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET || "",
});

interface LocationData {
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

const transportModes = [
  { value: "plane", label: "Plane" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "ferry", label: "Ferry" },
];

const BookingSection: React.FC = () => {
  // const [selectedModes, setSelectedModes] = useState<Selection>(new Set(["plane", "train"]));
  // const [originQuery, setOriginQuery] = useState("");
  // const [destQuery, setDestQuery] = useState("");
  // const [originResults, setOriginResults] = useState<LocationData[]>([]);
  // const [destResults, setDestResults] = useState<LocationData[]>([]);
  // const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
  // const [isLoadingDest, setIsLoadingDest] = useState(false);

  const { travelerSearchForm, setTravelerSearchForm } =
    useContext(TravelSearchContext);
  const [formState, setFormState] = useState({
    selectedModes: new Set(["plane", "train"]) as Selection,
    originQuery: "",
    destQuery: "",
    originResults: [] as Array<LocationData>,
    destResults: [] as Array<LocationData>,
    isLoadingOrigin: false,
    isLoadingDest: false,
  });

  const {
    isLoadingOrigin,
    originResults,
    destResults,
    destQuery,
    isLoadingDest,
    originQuery,
    selectedModes,
  } = formState;

  const searchLocations = async (query: string, isOrigin: boolean) => {
    if (query.length < 2) {
      if (isOrigin) {
        // setOriginResults([]);
        setFormState((prevState) => ({ ...prevState, originResults: [] }));
      } else {
        setFormState((prevState) => ({ ...prevState, destResults: [] }));
        // setDestResults([]);
      }
      return;
    }

    if (isOrigin) {
      setFormState((prevState) => ({ ...prevState, isLoadingOrigin: true }));
      // setIsLoadingOrigin(true);
    } else {
      setFormState((prevState) => ({ ...prevState, isLoadingDest: true }));
      // setIsLoadingDest(true);
    }

    try {
      const response = await amadeus.referenceData.locations.get({
        keyword: query,
        subType: "CITY",
        "page[limit]": 10,
      });

      if (isOrigin) {
        setFormState((prevState) => ({
          ...prevState,
          originResults: response.data,
          isLoadingOrigin: false,
        }));
        // setOriginResults();
        // setIsLoadingOrigin(false);
      } else {
        setFormState((prevState) => ({
          ...prevState,
          destResults: response.data,
          isLoadingDest: false,
        }));
        // setDestResults(response.data);
        // setIsLoadingDest(false);
      }
    } catch (error) {
      console.error("Error searching locations:", error);
      if (isOrigin) {
        setFormState((prevState) => ({ ...prevState, isLoadingOrigin: false }));
        // setIsLoadingOrigin(false);
      } else {
        setFormState((prevState) => ({ ...prevState, isLoadingDest: false }));
        // setIsLoadingDest(false);
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
    if (newSelection === "all") return;
    if (newSelection.size > 0) {
      // setSelectedModes(newSelection);
      setFormState((prevState) => ({
        ...prevState,
        selectedModes: newSelection,
      }));
    }
  };

  const handleSearch = () => {
    console.log(travelerSearchForm);
    setTravelerSearchForm((prev) => ({ ...prev, ...formState }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="grid grid-cols-2 gap-4 col-span-2">
          <Autocomplete
            label="Origin"
            placeholder="Origin city"
            className="h-full mt-2"
            onInputChange={
              (value) =>
                setFormState((prevState) => ({
                  ...prevState,
                  originQuery: value,
                })) /*setOriginQuery(value)*/
            }
            isLoading={isLoadingOrigin}
          >
            {originResults.map((location) => (
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
          <Autocomplete
            label="Destiny"
            placeholder="Destiny city"
            className="h-full mt-2"
            onInputChange={(value) =>
              setFormState((prevState) => ({ ...prevState, destQuery: value }))
            }
            // onInputChange={(value) => setFormState((prevState) => ({...prevState, destQuery: value })}
            isLoading={isLoadingDest}
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
          <DatePicker label="Departure" isRequired className="mt-2" />
          <DatePicker label="Return" className="mt-2" />
        </div>
        <Card>
          <CardBody className="flex flex-col gap-4">
            <Input type="number" label="Travelers" />
            <Select
              label="Transport Modes"
              placeholder="Select transport modes"
              selectionMode="multiple"
              selectedKeys={selectedModes}
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

