import React from "react";
import { XIcon } from "lucide-react";
import { useAddRoom } from "../hooks/useAddRoom";

interface AddRoomModalProps {
  buildingId: string;
  buildingName: string;
  maxFloors: number;
  onClose: () => void;
  onSuccess: (room: any) => void;
}

export function AddRoomModal({ buildingId, buildingName, maxFloors, onClose, onSuccess }: AddRoomModalProps) {
  const { formData, loading, error, handleChange, submitRoom } = useAddRoom({
    buildingId,
    maxFloors,
    onSuccess,
    onClose
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRoom();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dodaj Nową Salę</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Budynek</label>
            <input
              type="text"
              value={buildingName}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nazwa sali</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="np. Sala Konferencyjna A"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Pojemność (liczba osób)
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange("capacity", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="np. 50"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Piętro (max: {maxFloors})</label>
            <input
              type="number"
              value={formData.floor}
              onChange={(e) => handleChange("floor", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={`np. 2 (max ${maxFloors})`}
              required
              min="0"
              max={maxFloors}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Dodawanie...' : 'Dodaj'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
