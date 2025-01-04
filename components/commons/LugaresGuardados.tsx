import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export default function LugaresGuardados() {
  const [lugares, setLugares] = useState([
    { ciudad: "Tokio, Japón" },
    { ciudad: "Cuenca, España" },
    { ciudad: "Múnich, Alemania" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  const handleCreateVotacion = () => {
    if (!pais && !ciudad) {
      setError("Por favor, proporciona al menos un País o una Ciudad.");
      return;
    }

    const nuevaVotacion = { ciudad: `${ciudad || ""}, ${pais || ""}`.trim() };
    setLugares([...lugares, nuevaVotacion]);
    setPais("");
    setCiudad("");
    setError("");
    setIsModalOpen(false);
  };

  const handleVote = (tipo, lugar) => {
    alert(`API no disponible. Intentaste votar: ${tipo} en ${lugar.ciudad}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Lugares Guardados</h2>
      <ul>
        {lugares.map((lugar, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span>{lugar.ciudad}</span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                color="error"
                className="p-2"
                onClick={() => handleVote("heart", lugar)}
                aria-label={`Votar con corazón por ${lugar.ciudad}`}
              >
                <Icon icon="mdi:heart" className="text-lg" />
              </Button>
              <Button
                size="sm"
                color="primary"
                className="p-2"
                onClick={() => handleVote("circle", lugar)}
                aria-label={`Votar con círculo por ${lugar.ciudad}`}
              >
                <Icon icon="mdi:circle-outline" className="text-lg" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button
          size="md"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir modal para crear votación"
        >
          Crear Votación
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
      >
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold" id="modal-title">Crear Nueva Votación</h2>
          </CardHeader>
          <CardBody className="gap-4">
            <Input
              clearable
              label="País"
              placeholder="Introduce el país"
              value={pais}
              onChange={(e) => {
                setPais(e.target.value);
                setError("");
              }}
              aria-label="Campo para introducir el país"
            />
            <Input
              clearable
              label="Ciudad"
              placeholder="Introduce la ciudad"
              value={ciudad}
              onChange={(e) => {
                setCiudad(e.target.value);
                setError("");
              }}
              aria-label="Campo para introducir la ciudad"
            />
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
          </CardBody>
          <CardFooter className="flex justify-end gap-2">
            <Button flat color="error" onClick={() => setIsModalOpen(false)} aria-label="Cancelar creación de votación">
              Cancelar
            </Button>
            <Button onClick={handleCreateVotacion} aria-label="Crear votación">
              Crear
            </Button>
          </CardFooter>
        </Card>
      </Modal>
    </div>
  );
}
