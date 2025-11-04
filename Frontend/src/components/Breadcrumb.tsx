import React from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
interface BreadcrumbProps {
  currentStep: 'buildings' | 'rooms' | 'datetime';
  selectedBuilding: any;
  selectedRoom: any;
  onBack: () => void;
}
export function Breadcrumb({
  currentStep,
  selectedBuilding,
  selectedRoom,
  onBack
}: BreadcrumbProps) {
  return <div className="mb-6 flex items-center gap-3">
      {currentStep !== 'buildings' && <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>}
      <div className="flex items-center gap-2 text-sm">
        <span className={currentStep === 'buildings' ? 'font-semibold text-black' : 'text-gray-600'}>
          Budynki
        </span>
        {selectedBuilding && <>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className={currentStep === 'rooms' ? 'font-semibold text-black' : 'text-gray-600'}>
              {selectedBuilding.title}
            </span>
          </>}
        {selectedRoom && <>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-black">
              {selectedRoom.name}
            </span>
          </>}
      </div>
    </div>;
}