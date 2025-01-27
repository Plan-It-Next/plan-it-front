import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-[90%] max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const LugaresGuardados = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({ city: '', country: '' });
  const [places, setPlaces] = useState([
    { city: 'Tokio', country: 'Japón' },
    { city: 'Cuenca', country: 'España' },
    { city: 'Múnich', country: 'Alemania' },
  ]);
  const [errorMensaje, setErrorMensaje] = useState(""); // Estado para el mensaje de error

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewPlace({ city: '', country: '' });
  };

  const handleAddPlace = () => {
    if (newPlace.city.trim() === '' && newPlace.country.trim() === '') {
      alert('Por favor, introduce al menos una ciudad o un país.');
      return;
    }
    setPlaces([...places, newPlace]);
    closeModal();
  };

  const handleVote = async (type, place) => {
    try {
      // Simulación de la llamada a la API
      await new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("API no disponible")), 1000)
      );
    } catch (error) {
      setErrorMensaje(`Api no disponible para votar: ${place.city}, ${place.country}`);
    }

    // Mostrar el mensaje durante 6 segundos
    setTimeout(() => setErrorMensaje(""), 6000);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Lugares Guardados</h2>
      <ul>
        {places.map((place, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b"
          >
            <span>
              {place.city}, {place.country}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleVote('heart', place)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                aria-label={`Votar con corazón por ${place.city}, ${place.country}`}
              >
                <Icon icon="mdi:heart" className="text-lg" />
              </button>
              <button
                onClick={() => handleVote('circle', place)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                aria-label={`Votar con círculo por ${place.city}, ${place.country}`}
              >
                <Icon icon="mdi:circle-outline" className="text-lg" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear Votación
      </button>

      {errorMensaje && (
        <div className="mt-4 text-center text-red-600">
          {errorMensaje}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-xl font-semibold">Crear Nueva Votación</h3>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Ciudad"
            value={newPlace.city}
            onChange={(e) => setNewPlace({ ...newPlace, city: e.target.value })}
            className="w-full border border-gray-300 rounded p-2 mb-2"
          />
          <input
            type="text"
            placeholder="País"
            value={newPlace.country}
            onChange={(e) => setNewPlace({ ...newPlace, country: e.target.value })}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddPlace}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LugaresGuardados;
