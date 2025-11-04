import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface AddBuildingModalProps {
  onClose: () => void;
}
export function AddBuildingModal({
  onClose
}: AddBuildingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    floors: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Nowy budynek dodany: ${formData.title}`);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dodaj Nowy Budynek</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nazwa budynku
            </label>
            <input type="text" value={formData.title} onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Opis</label>
            <textarea value={formData.description} onChange={e => setFormData({
            ...formData,
            description: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Adres</label>
            <input type="text" value={formData.address} onChange={e => setFormData({
            ...formData,
            address: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Liczba pięter
            </label>
            <input type="number" value={formData.floors} onChange={e => setFormData({
            ...formData,
            floors: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" required min="1" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              Anuluj
            </button>
            <button type="submit" className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>;
}