import React, { useEffect, useState } from "react";

const StickySidebar = () => {
  const [isScrolledBeyondContent, setIsScrolledBeyondContent] = useState(false);

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
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Horario</h3>
              <p>00:00 - 23:55</p>
            </div>
            <div>
              <h3 className="font-semibold">Duración del viaje</h3>
              <p>1.0 - 31.0 horas</p>
            </div>
            <div>
              <h3 className="font-semibold">Líneas de transporte</h3>
              <ul className="list-disc pl-5">
                <li>ALSA</li>
                <li>FlixBus</li>
                <li>AVE</li>
                <li>Vueling</li>
                <li>Ryanair</li>
              </ul>
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
