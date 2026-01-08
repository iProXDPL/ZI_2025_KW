import { useState } from 'react';

const API_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000") + "/api";

interface UseAddBuildingProps {
    title: string;
    description: string;
    address: string;
    floors: string;
    onClose: () => void;
    onSuccess: (building: any) => void;
}

export function useAddBuilding({
    title,
    description,
    address,
    floors,
    onClose,
    onSuccess
  }: UseAddBuildingProps) {
    const [formData, setFormData] = useState({
        title: title || '',
        description: description || '',
        address: address || '',
        floors: floors || ''
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');

      const handleChange = (field: string, value: string) => {
          setFormData(prev => ({
              ...prev,
              [field]: value
          }));
      };
    
      const submitBuilding = async () => {
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

      return {
          formData,
          loading,
          error,
          handleChange,
          submitBuilding
      };
}
