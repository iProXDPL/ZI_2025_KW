import React, { useState } from "react";
import { XIcon, MailIcon, LockIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

export function LoginModal({ onClose, onRegisterClick }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(formData);
      if (success) {
        onClose(); // Automatyczne zamknięcie modala
      }
    } catch (err: any) {
      setError(err.message || "Wystąpił błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Zaloguj się</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <MailIcon className="w-4 h-4" />
              Email)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="twoj@email.com"
              required
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <LockIcon className="w-4 h-4" />
              Hasło
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            {IsLoading ? "Czekaj.." : "Zaloguj się"}
          </button>
          <div className="text-red-500">{Error}</div>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Nie masz konta?{" "}
              <button
                type="button"
                onClick={onRegisterClick}
                className="text-black font-semibold hover:underline"
              >
                Zarejestruj się
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
