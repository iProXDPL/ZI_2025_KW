import { useState } from "react";

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";

interface UseAddRoomProps {
  buildingId: string;
  maxFloors: number;
  onSuccess: (room: any) => void;
  onClose: () => void;
}

export function useAddRoom({ buildingId, maxFloors, onSuccess, onClose }: UseAddRoomProps) {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    floor: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const  handleChange = (field: string, value: string) => {
      setFormData(prev => ({
          ...prev,
          [field]: value
      }));
  }

  const submitRoom = async () => {
    setLoading(true);
    setError('');

    if (parseInt(formData.floor) > maxFloors) {
      setError(`Piętro nie może być wyższe niż ${maxFloors}`);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          name: formData.name,
          buildingId: buildingId,
          capacity: parseInt(formData.capacity),
          type: "Sala",
          floor: parseInt(formData.floor)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create room");
      }

      const newRoom = await response.json();
      onSuccess(newRoom);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Błąd podczas dodawania sali');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    submitRoom
  };
}
