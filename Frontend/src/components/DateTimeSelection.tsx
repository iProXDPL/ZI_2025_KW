import React, { useMemo, useState } from 'react';
import { CalendarIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
interface DateTimeSelectionProps {
  building: any;
  room: any;
}
interface OccupiedSlot {
  date: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  user: string;
}
export function DateTimeSelection({
  building,
  room
}: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  // Example occupied slots - in real app this would come from backend
  const occupiedSlots: OccupiedSlot[] = [{
    date: '2024-12-20',
    startHour: '09',
    startMinute: '00',
    endHour: '10',
    endMinute: '30',
    user: 'Jan Kowalski'
  }, {
    date: '2024-12-20',
    startHour: '14',
    startMinute: '00',
    endHour: '15',
    endMinute: '00',
    user: 'Anna Nowak'
  }, {
    date: '2024-12-21',
    startHour: '11',
    startMinute: '00',
    endHour: '12',
    endMinute: '30',
    user: 'Piotr Wiśniewski'
  }];
  const hours = Array.from({
    length: 24
  }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({
    length: 60
  }, (_, i) => i.toString().padStart(2, '0'));
  const occupiedSlotsForDate = useMemo(() => {
    return occupiedSlots.filter(slot => slot.date === selectedDate);
  }, [selectedDate]);
  const isTimeSlotOccupied = (hour: string, minute: string): boolean => {
    if (!selectedDate) return false;
    const selectedTime = parseInt(hour) * 60 + parseInt(minute);
    return occupiedSlotsForDate.some(slot => {
      const startTime = parseInt(slot.startHour) * 60 + parseInt(slot.startMinute);
      const endTime = parseInt(slot.endHour) * 60 + parseInt(slot.endMinute);
      return selectedTime >= startTime && selectedTime < endTime;
    });
  };
  const handleSubmit = () => {
    if (selectedDate && selectedHour && selectedMinute) {
      if (isTimeSlotOccupied(selectedHour, selectedMinute)) {
        alert('Ten termin jest już zajęty! Wybierz inną godzinę.');
        return;
      }
      alert(`Rezerwacja:\nBudynek: ${building.title}\nSala: ${room.name}\nData: ${selectedDate}\nGodzina: ${selectedHour}:${selectedMinute}`);
    }
  };
  const isCurrentSelectionOccupied = selectedHour && selectedMinute && isTimeSlotOccupied(selectedHour, selectedMinute);
  return <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wybierz Datę i Godzinę</h1>
        <p className="text-gray-600">
          Wybierz termin rezerwacji dla {room.name}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <CalendarIcon className="w-4 h-4" />
                Data
              </label>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <ClockIcon className="w-4 h-4" />
                Godzina
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Godzina
                  </label>
                  <select value={selectedHour} onChange={e => setSelectedHour(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="">--</option>
                    {hours.map(hour => <option key={hour} value={hour}>
                        {hour}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Minuta
                  </label>
                  <select value={selectedMinute} onChange={e => setSelectedMinute(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="">--</option>
                    {minutes.map(minute => <option key={minute} value={minute}>
                        {minute}
                      </option>)}
                  </select>
                </div>
              </div>
            </div>
            {isCurrentSelectionOccupied && <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Ten termin jest zajęty
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    Wybierz inną godzinę z dostępnych terminów
                  </p>
                </div>
              </div>}
            <button onClick={handleSubmit} disabled={!selectedDate || !selectedHour || !selectedMinute || isCurrentSelectionOccupied} className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              Zarezerwuj Salę
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold mb-4">Zajęte godziny</h3>
          {!selectedDate ? <p className="text-gray-500 text-sm">
              Wybierz datę, aby zobaczyć zajęte godziny
            </p> : occupiedSlotsForDate.length === 0 ? <p className="text-green-600 text-sm">
              Brak rezerwacji na ten dzień - wszystkie godziny dostępne
            </p> : <div className="space-y-3">
              {occupiedSlotsForDate.map((slot, index) => <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-900">
                      {slot.startHour}:{slot.startMinute} - {slot.endHour}:
                      {slot.endMinute}
                    </span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      Zajęte
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    Zarezerwowane przez: {slot.user}
                  </p>
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
}