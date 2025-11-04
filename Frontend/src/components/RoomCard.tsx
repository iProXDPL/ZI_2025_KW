import React from 'react';
import { DoorOpenIcon, UsersIcon, LayersIcon, WrenchIcon } from 'lucide-react';
interface RoomCardProps {
  name: string;
  capacity: number;
  floor: number;
}
export function RoomCard({
  name,
  capacity,
  floor,
  equipment
}: RoomCardProps) {
  return <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <DoorOpenIcon className="w-7 h-7 text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">{name}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <UsersIcon className="w-4 h-4" />
              <span>Pojemność: {capacity} osób</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <LayersIcon className="w-4 h-4" />
              <span>Piętro {floor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}