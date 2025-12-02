import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";

interface AddBuildingModalProps {
  title: string;
  description: string;
  address: string;
  floors: string;
  onClose: () => void;
  onSuccess: (building: any) => void;
}

export function AddBuildingModal({
  title,
  description,
  address,
  floors,
  onClose,
  onSuccess
}: AddBuildingModalProps) {
  const [formData, setFormData] = useState({
    title: title || '',
    description: description || '',
    address: address || '',
    floors: floors || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/buildings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          name: formData.title,
          address: formData.address,
          description: formData.description,
          floors: parseInt(formData.floors)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create building");
      }

      const newBuilding = await response.json();
      onSuccess(newBuilding);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Błąd podczas dodawania budynku');
    } finally {
      setLoading(false);
    }
  };

  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dodaj Nowy Budynek</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        
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
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" rows={3} />
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
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" min="1" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              Anuluj
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50">
              {loading ? 'Dodawanie...' : 'Dodaj'}
            </button>
          </div>
        </form>
      </div>
    </div>;
}