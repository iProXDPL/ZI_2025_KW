import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BuildingCard } from './components/BuildingCard';
import { RoomCard } from './components/RoomCard';
import { DateTimeSelection } from './components/DateTimeSelection';
import { Breadcrumb } from './components/Breadcrumb';
import { AddBuildingModal } from './components/AddBuildingModal';
import { AddRoomModal } from './components/AddRoomModal';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { Users } from './components/Users';
import { PlusIcon } from 'lucide-react';
export function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Sale');
  const [currentStep, setCurrentStep] = useState<'buildings' | 'rooms' | 'datetime'>('buildings');
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showAddBuildingModal, setShowAddBuildingModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const buildings = [{
    id: 1,
    title: 'Budynek Główny',
    description: 'Główny budynek biurowy z salami konferencyjnymi',
    address: 'ul. Główna 1, Warszawa',
    floors: 5
  }, {
    id: 2,
    title: 'Budynek Techniczny',
    description: 'Budynek z laboratoriami i salami szkoleniowymi',
    address: 'ul. Techniczna 10, Warszawa',
    floors: 3
  }, {
    id: 3,
    title: 'Centrum Konferencyjne',
    description: 'Nowoczesne centrum z dużymi salami konferencyjnymi',
    address: 'al. Konferencyjna 25, Warszawa',
    floors: 2
  }];
  const rooms = [{
    id: 1,
    name: 'Sala Konferencyjna A',
    capacity: 50,
    floor: 2,
    equipment: ['Projektor', 'Tablica', 'Klimatyzacja']
  }, {
    id: 2,
    name: 'Sala Szkoleniowa B',
    capacity: 30,
    floor: 3,
    equipment: ['Projektor', 'Komputery', 'Klimatyzacja']
  }, {
    id: 3,
    name: 'Sala Warsztatowa C',
    capacity: 20,
    floor: 1,
    equipment: ['Tablica', 'Flipchart']
  }, {
    id: 4,
    name: 'Sala Spotkań D',
    capacity: 15,
    floor: 2,
    equipment: ['TV', 'Videokonferencja']
  }];
  const handleBuildingSelect = (building: any) => {
    setSelectedBuilding(building);
    setCurrentStep('rooms');
  };
  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setCurrentStep('datetime');
  };
  const handleBack = () => {
    if (currentStep === 'datetime') {
      setCurrentStep('rooms');
      setSelectedRoom(null);
    } else if (currentStep === 'rooms') {
      setCurrentStep('buildings');
      setSelectedBuilding(null);
    }
  };
  const handleOpenRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };
  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    if (item === 'Sale') {
      setCurrentStep('buildings');
      setSelectedBuilding(null);
      setSelectedRoom(null);
    }
  };
  return <div className="flex w-full min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} activeItem={activeMenuItem} onLoginClick={() => setShowLoginModal(true)} onMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activeMenuItem === 'Sale' && <>
              <Breadcrumb currentStep={currentStep} selectedBuilding={selectedBuilding} selectedRoom={selectedRoom} onBack={handleBack} />
              {currentStep === 'buildings' && <>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        Wybierz Budynek
                      </h1>
                      <p className="text-gray-600">
                        Wybierz budynek, w którym chcesz zarezerwować salę
                      </p>
                    </div>
                    <button onClick={() => setShowAddBuildingModal(true)} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors">
                      <PlusIcon className="w-5 h-5" />
                      Dodaj Budynek
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buildings.map(building => <div key={building.id} onClick={() => handleBuildingSelect(building)}>
                        <BuildingCard {...building} />
                      </div>)}
                  </div>
                </>}
              {currentStep === 'rooms' && selectedBuilding && <>
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Wybierz Salę</h1>
                      <p className="text-gray-600">
                        Wybierz salę w budynku {selectedBuilding.title}
                      </p>
                    </div>
                    <button onClick={() => setShowAddRoomModal(true)} className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-800 transition-colors">
                      <PlusIcon className="w-5 h-5" />
                      Dodaj Salę
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => <div key={room.id} onClick={() => handleRoomSelect(room)}>
                        <RoomCard {...room} />
                      </div>)}
                  </div>
                </>}
              {currentStep === 'datetime' && selectedRoom && <DateTimeSelection building={selectedBuilding} room={selectedRoom} />}
            </>}
          {activeMenuItem === 'Użytkownicy' && <Users />}
        </div>
      </div>
      {showAddBuildingModal && <AddBuildingModal onClose={() => setShowAddBuildingModal(false)} />}
      {showAddRoomModal && <AddRoomModal buildingName={selectedBuilding?.title} onClose={() => setShowAddRoomModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onRegisterClick={handleOpenRegister} />}
      {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
    </div>;
}