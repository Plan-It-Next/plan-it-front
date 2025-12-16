import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const StickySidebar = () => {
  const [isScrolledBeyondContent, setIsScrolledBeyondContent] = useState(false);
  const [timeRange, setTimeRange] = useState([0, 23]); // Inicialmente 00:00 a 23:00 para el horario
  const [durationRange, setDurationRange] = useState([1, 31]); // Inicialmente 1 a 31 horas para duración de viaje

  const [busChecks, setBusChecks] = useState({ ALSA: false, FlixBus: false });
  const [trainChecks, setTrainChecks] = useState({
    AVE: false,
    Avant: false,
    Alvia: false,
    Euromed: false,
    Feve: false,
    MD: false,
  });
  const [planeChecks, setPlaneChecks] = useState({
    Iberia: false,
    Vueling: false,
    "Air Europa": false,
    "Norwegian Air Shuttle": false,
    EasyJet: false,
    Ryanair: false,
    "Air Baltic": false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sidebarElement = document.getElementById("sidebar");
      if (!sidebarElement) return;

      const rect = sidebarElement.getBoundingClientRect();
      const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      setIsScrolledBeyondContent(!fullyVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectAll = <T extends Record<string, boolean>>(
    group: T, 
    setGroupChecks: React.Dispatch<React.SetStateAction<T>>, 
    value: boolean
  ) => {
    const updatedChecks = {} as T;
    Object.keys(group).forEach((key) => {
      (updatedChecks as any)[key] = value;
    });
    setGroupChecks(updatedChecks);
  };

  const formatTime = (value: number): string => {
    const hours = Math.floor(value);
    const minutes = (value % 1) * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleTimeRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setTimeRange(values);
    }
  };

  const handleDurationRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setDurationRange(values);
    }
  };

  return (
    <div
      id="sidebar"
      className={`fixed top-0 left-0 h-full bg-white shadow-md transition-all duration-300 ${
        isScrolledBeyondContent ? "bg-gray-100" : "bg-white"
      }`}
      style={{ width: "20%" }}
    >
      {!isScrolledBeyondContent ? (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Opciones</h2>
          <div className="space-y-6">
            {/* Horario dinámico */}
            <div>
              <h3 className="font-semibold">Horario</h3>
              <p className="text-gray-900 font-medium text-lg">
                {formatTime(timeRange[0])} - {formatTime(timeRange[1])}
              </p>
              <Slider
                range
                min={0}
                max={23}
                step={1}
                defaultValue={[0, 23]}
                onChange={handleTimeRangeChange}
                railStyle={{ backgroundColor: "#e5e5e5" }}
                trackStyle={{ backgroundColor: "#000" }}
                handleStyle={{ borderColor: "#000", backgroundColor: "#000" }}
              />
            </div>

            {/* Duración del viaje dinámica */}
            <div>
              <h3 className="font-semibold">Duración del viaje</h3>
              <p className="text-gray-900 font-medium text-lg">
                {durationRange[0]} - {durationRange[1]} horas
              </p>
              <Slider
                range
                min={1}
                max={31}
                step={1}
                defaultValue={[1, 31]}
                onChange={handleDurationRangeChange}
                railStyle={{ backgroundColor: "#e5e5e5" }}
                trackStyle={{ backgroundColor: "#000" }}
                handleStyle={{ borderColor: "#000", backgroundColor: "#000" }}
              />
            </div>

            {/* Líneas de transporte */}
            <div>
              <h3 className="font-bold text-lg mb-2">Transport lines</h3>

              {/* BUS */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm">BUS</h4>
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(busChecks, setBusChecks, true)}
                >
                  Select all
                </button>{" "}
                |{" "}
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(busChecks, setBusChecks, false)}
                >
                  Clear all
                </button>
                <ul className="mt-2">
                  {Object.keys(busChecks).map((key) => (
                    <li key={key}>
                      <input
                        type="checkbox"
                        id={key}
                        checked={busChecks[key as keyof typeof busChecks]}
                        onChange={() =>
                          setBusChecks((prev) => ({
                            ...prev,
                            [key]: !prev[key as keyof typeof prev],
                          }))
                        }
                      />{" "}
                      <label htmlFor={key}>{key}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TRAIN */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm">TRAIN</h4>
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(trainChecks, setTrainChecks, true)}
                >
                  Select all
                </button>{" "}
                |{" "}
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(trainChecks, setTrainChecks, false)}
                >
                  Clear all
                </button>
                <ul className="mt-2">
                  {Object.keys(trainChecks).map((key) => (
                    <li key={key}>
                      <input
                        type="checkbox"
                        id={key}
                        checked={trainChecks[key as keyof typeof trainChecks]}
                        onChange={() =>
                          setTrainChecks((prev) => ({
                            ...prev,
                            [key]: !prev[key as keyof typeof prev],
                          }))
                        }
                      />{" "}
                      <label htmlFor={key}>{key}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* PLANE */}
              <div>
                <h4 className="font-semibold text-sm">PLANE</h4>
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(planeChecks, setPlaneChecks, true)}
                >
                  Select all
                </button>{" "}
                |{" "}
                <button
                  className="text-blue-500 text-xs"
                  onClick={() => handleSelectAll(planeChecks, setPlaneChecks, false)}
                >
                  Clear all
                </button>
                <ul className="mt-2">
                  {Object.keys(planeChecks).map((key) => (
                    <li key={key}>
                      <input
                        type="checkbox"
                        id={key}
                        checked={planeChecks[key as keyof typeof planeChecks]}
                        onChange={() =>
                          setPlaneChecks((prev) => ({
                            ...prev,
                            [key]: !prev[key as keyof typeof prev],
                          }))
                        }
                      />{" "}
                      <label htmlFor={key}>{key}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full"></div>
      )}
    </div>
  );
};

export default StickySidebar;
