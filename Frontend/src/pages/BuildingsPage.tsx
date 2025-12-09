import { useState, useEffect } from "react";
import { BuildingCard } from "../components/BuildingCard";
import { RoomCard } from "../components/RoomCard";
import { DateTimeSelection } from "../components/DateTimeSelection";
import { Breadcrumb } from "../components/Breadcrumb";
import { PlusIcon } from "lucide-react";
import { AddRoomModal } from "../components/AddRoomModal";
import { AddBuildingModal } from "../components/AddBuildingModal";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";

export interface Building {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  floors?: number;
  createdAt: string;
}

export interface Room {
  _id: string;
  name: string;
  building: Building | string;
  capacity?: number;
  type?: string;
  floor?: number;
  createdAt: string;
}

export function BuildingsPage() {
  const [currentStep, setCurrentStep] = useState<
    "buildings" | "rooms" | "datetime"
  >("buildings");
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      fetchRooms();
    }
  }, [selectedBuilding]);

  const fetchBuildings = async () => {
    try {
      const response = await fetch(`${API_URL}/buildings`);
      if (!response.ok) throw new Error("Failed to fetch buildings");
      const data = await response.json();
      setBuildings(data);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_URL}/rooms`);
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      
      if (selectedBuilding) {
        const buildingRooms = data.filter((room: Room) => 
          typeof room.building === 'string' 
            ? room.building === selectedBuilding._id 
            : (room.building as Building)._id === selectedBuilding._id
        );
        setRooms(buildingRooms);
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    }
  };

  const handleBuildingSelect = (building: Building) => {
    setSelectedBuilding(building);
    setCurrentStep("rooms");
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setCurrentStep("datetime");
  };

  const handleBack = () => {
    if (currentStep === "datetime") {
      setCurrentStep("rooms");
      setSelectedRoom(null);
    } else if (currentStep === "rooms") {
      setCurrentStep("buildings");
      setSelectedBuilding(null);
    }
  };

  const handleBuildingAdded = (newBuilding: Building) => {
    setBuildings([...buildings, newBuilding]);
  };

  const handleRoomAdded = (newRoom: Room) => {
    setRooms([...rooms, newRoom]);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Ładowanie...</div>;
  }

  return (
    <>
      <Breadcrumb
        currentStep={currentStep}
        selectedBuilding={selectedBuilding}
        selectedRoom={selectedRoom}
        onBack={handleBack}
      />

      {currentStep === "buildings" && (
        <BuildingsStep
          buildings={buildings}
          onBuildingSelect={handleBuildingSelect}
          onShowAddBuildingModal={() => setShowAddBuildingModal(true)}
        />
      )}

      {currentStep === "rooms" && selectedBuilding && (
        <RoomsStep
          selectedBuilding={selectedBuilding}
          rooms={rooms}
          onRoomSelect={handleRoomSelect}
          onShowAddRoomModal={() => setShowAddRoomModal(true)}
        />
      )}

      {currentStep === "datetime" && selectedRoom && (
        <DateTimeSelection building={selectedBuilding} room={selectedRoom} />
      )}

      {showAddRoomModal && selectedBuilding && (
        <AddRoomModal 
          onClose={() => setShowAddRoomModal(false)} 
          buildingId={selectedBuilding._id}
          buildingName={selectedBuilding.name}
          maxFloors={selectedBuilding.floors || 0}
          onSuccess={handleRoomAdded}
        />
      )}

      {showAddBuildingModal && (
        <AddBuildingModal 
          title=""
          description=""
          address=""
          floors=""
          onClose={() => setShowAddBuildingModal(false)}
          onSuccess={handleBuildingAdded}
        />
      )}
    </>
  );
}

interface BuildingsStepProps {
  buildings: Building[];
  onBuildingSelect: (building: Building) => void;
  onShowAddBuildingModal: () => void;
}

function BuildingsStep({
  buildings,
  onBuildingSelect,
  onShowAddBuildingModal,
}: BuildingsStepProps) {
  return (
    <>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wybierz Budynek</h1>
          <p className="text-gray-600">
            Wybierz budynek, w którym chcesz zarezerwować salę
          </p>
        </div>
        <button
          onClick={onShowAddBuildingModal}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Dodaj Budynek
        </button>
      </div>
      {buildings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Brak dostępnych budynków</p>
          <button
            onClick={onShowAddBuildingModal}
            className="text-black font-medium hover:underline"
          >
            Dodaj pierwszy budynek
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <div key={building._id} onClick={() => onBuildingSelect(building)}>
              <BuildingCard 
                title={building.name} 
                description={building.address || "Brak adresu"} 
                address={building.address || ""} 
                floors={building.floors || 0} 
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

interface RoomsStepProps {
  selectedBuilding: Building;
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
  onShowAddRoomModal: () => void;
}

function RoomsStep({
  selectedBuilding,
  rooms,
  onRoomSelect,
  onShowAddRoomModal,
}: RoomsStepProps) {
  return (
    <>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wybierz Salę</h1>
          <p className="text-gray-600">
            Wybierz salę w budynku {selectedBuilding.name}
          </p>
        </div>
        <button
          onClick={onShowAddRoomModal}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Dodaj Salę
        </button>
      </div>
      {rooms.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Brak dostępnych sal w tym budynku</p>
          <button
            onClick={onShowAddRoomModal}
            className="text-black font-medium hover:underline"
          >
            Dodaj pierwszą salę
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} onClick={() => onRoomSelect(room)}>
              <RoomCard 
                name={room.name}
                capacity={room.capacity || 0}
                floor={room.floor || 0} 
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
