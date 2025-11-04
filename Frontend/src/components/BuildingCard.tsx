import React from 'react';
import { BuildingIcon, MapPinIcon, LayersIcon } from 'lucide-react';
interface BuildingCardProps {
  title: string;
  description: string;
  address: string;
  floors: number;
}
export function BuildingCard({
  title,
  description,
  address,
  floors
}: BuildingCardProps) {
  return <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <BuildingIcon className="w-7 h-7 text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPinIcon className="w-4 h-4" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <LayersIcon className="w-4 h-4" />
              <span>{floors} pięter</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}