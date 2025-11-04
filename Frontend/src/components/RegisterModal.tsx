import React, { useState } from 'react';
import { XIcon, MailIcon, LockIcon, UserIcon } from 'lucide-react';
interface RegisterModalProps {
  onClose: () => void;
}
export function RegisterModal({
  onClose
}: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Hasła nie są identyczne!');
      return;
    }
    alert(`Rejestracja: ${formData.name} (${formData.email})`);
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Zarejestruj się</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <UserIcon className="w-4 h-4" />
              Imię i nazwisko
            </label>
            <input type="text" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="Jan Kowalski" required />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <MailIcon className="w-4 h-4" />
              Email
            </label>
            <input type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="twoj@email.com" required />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <LockIcon className="w-4 h-4" />
              Hasło
            </label>
            <input type="password" value={formData.password} onChange={e => setFormData({
            ...formData,
            password: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="••••••••" required minLength={6} />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <LockIcon className="w-4 h-4" />
              Potwierdź hasło
            </label>
            <input type="password" value={formData.confirmPassword} onChange={e => setFormData({
            ...formData,
            confirmPassword: e.target.value
          })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" placeholder="••••••••" required minLength={6} />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors">
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>;
}