import React, { useState } from "react";
import { XIcon } from "lucide-react";
interface AddRoomModalProps {
  buildingName: string;
  onClose: () => void;
}
export function AddRoomModal({ buildingName, onClose }: AddRoomModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    floor: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nowa sala dodana: ${formData.name} w budynku ${buildingName}`);
    onClose();
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="np. 50"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Piętro</label>
            <input
              type="number"
              value={formData.floor}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  floor: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="np. 2"
              required
              min="0"
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
              className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
