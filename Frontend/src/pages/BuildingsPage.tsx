import { useState } from "react";
import { BuildingCard } from "../components/BuildingCard";
import { RoomCard } from "../components/RoomCard";
import { DateTimeSelection } from "../components/DateTimeSelection";
import { Breadcrumb } from "../components/Breadcrumb";
import { PlusIcon } from "lucide-react";

interface BuildingsPageProps {
  onShowAddBuildingModal: () => void;
  onShowAddRoomModal: () => void;
}

export function BuildingsPage({
  onShowAddBuildingModal,
  onShowAddRoomModal,
}: BuildingsPageProps) {
  const [currentStep, setCurrentStep] = useState<
    "buildings" | "rooms" | "datetime"
  >("buildings");
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const buildings = [
    {
      id: 1,
      title: "Budynek Główny",
      description: "Główny budynek biurowy z salami konferencyjnymi",
      address: "ul. Główna 1, Warszawa",
      floors: 5,
    },
    {
      id: 2,
      title: "Budynek Techniczny",
      description: "Budynek z laboratoriami i salami szkoleniowymi",
      address: "ul. Techniczna 10, Warszawa",
      floors: 3,
    },
    {
      id: 3,
      title: "Centrum Konferencyjne",
      description: "Nowoczesne centrum z dużymi salami konferencyjnymi",
      address: "al. Konferencyjna 25, Warszawa",
      floors: 2,
    },
  ];

  const rooms = [
    {
      id: 1,
      name: "Sala Konferencyjna A",
      capacity: 50,
      floor: 2,
      equipment: ["Projektor", "Tablica", "Klimatyzacja"],
    },
    {
      id: 2,
      name: "Sala Szkoleniowa B",
      capacity: 30,
      floor: 3,
      equipment: ["Projektor", "Komputery", "Klimatyzacja"],
    },
    {
      id: 3,
      name: "Sala Warsztatowa C",
      capacity: 20,
      floor: 1,
      equipment: ["Tablica", "Flipchart"],
    },
    {
      id: 4,
      name: "Sala Spotkań D",
      capacity: 15,
      floor: 2,
      equipment: ["TV", "Videokonferencja"],
    },
  ];

  const handleBuildingSelect = (building: any) => {
    setSelectedBuilding(building);
    setCurrentStep("rooms");
  };

  const handleRoomSelect = (room: any) => {
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
          onShowAddBuildingModal={onShowAddBuildingModal}
        />
      )}

      {currentStep === "rooms" && selectedBuilding && (
        <RoomsStep
          selectedBuilding={selectedBuilding}
          rooms={rooms}
          onRoomSelect={handleRoomSelect}
          onShowAddRoomModal={onShowAddRoomModal}
        />
      )}

      {currentStep === "datetime" && selectedRoom && (
        <DateTimeSelection building={selectedBuilding} room={selectedRoom} />
      )}
    </>
  );
}

interface BuildingsStepProps {
  buildings: any[];
  onBuildingSelect: (building: any) => void;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map((building) => (
          <div key={building.id} onClick={() => onBuildingSelect(building)}>
            <BuildingCard {...building} />
          </div>
        ))}
      </div>
    </>
  );
}

interface RoomsStepProps {
  selectedBuilding: any;
  rooms: any[];
  onRoomSelect: (room: any) => void;
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
            Wybierz salę w budynku {selectedBuilding.title}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} onClick={() => onRoomSelect(room)}>
            <RoomCard {...room} />
          </div>
        ))}
      </div>
    </>
  );
}
