import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import {useAuth} from "@/context/AuthContext";



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
  const [polls, setPolls] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState(""); // Estado para el mensaje de error
  const { group, loading, error } = useAuth();

  const groupId = localStorage.getItem("group_id");

  useEffect(() => {
    if (groupId) {
      fetch(`/polls/${groupId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener las encuestas');
          }
          return response.json();
        })
        .then(data => {
          // Se asume que la respuesta tiene una propiedad "polls"
          setPolls(data.polls);
        })
        .catch(error => {
          setErrorMensaje("Error fetching polls");
          console.error("Error:", error);
        });
    }
  }, [groupId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewPlace({ city: '', country: '' });
  };

  const handleAddPlace = async () => {
    if (newPlace.city.trim() === '' && newPlace.country.trim() === '') {
      alert('Por favor, introduce al menos una ciudad o un país.');
      return;
    }
    const pollName = `${newPlace.city}, ${newPlace.country}`;
    try {
      const response = await fetch('/polls/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          group_id: groupId,
          name: pollName,
        }),
      });
      if (!response.ok) {
        throw new Error('Error creating poll');
      }
      // Se asume que la API devuelve la encuesta creada
      const newPoll = await response.json();
      // Se añade la nueva encuesta al estado
      setPolls([polls, newPoll]);
      closeModal();
    } catch (error) {
      setErrorMensaje(`Error creating poll: ${error}`);
      setTimeout(() => setErrorMensaje(""), 6000);
    }
  };
  const handleVote = async (voteType, poll) => {
    try {
      const response = await fetch('/polls/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poll_id: poll.id,    // se asume que cada encuesta tiene un id
          vote_type: voteType, // puede ser 'heart' o 'circle'
        }),
      });
      if (!response.ok) {
        throw new Error('Error voting');
      }
    } catch (error) {
      setErrorMensaje(`API no disponible para votar: ${poll.name}, ${error}`);
      setTimeout(() => setErrorMensaje(""), 6000);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">Lugares Guardados</h2>
      <ul>
        {polls.map((place, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b"
          >
            <span>
              {place.name}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleVote('heart', place)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                aria-label={`Votar con corazón por ${place.name}`}
              >
                <Icon icon="mdi:heart" className="text-lg" />
              </button>
              <button
                onClick={() => handleVote('circle', place)}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                aria-label={`Votar con círculo por ${place.name}`}
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
