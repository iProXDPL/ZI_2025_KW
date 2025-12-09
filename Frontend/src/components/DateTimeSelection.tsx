import { useMemo, useState } from "react";
import { CalendarIcon, ClockIcon, AlertCircleIcon, FileTextIcon } from "lucide-react";

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
  title?: string;
}

export function DateTimeSelection({ building, room }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("00");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("00");
  const [title, setTitle] = useState("");

  // Mock data matching backend structure conceptually
  const occupiedSlots: OccupiedSlot[] = [
    {
      date: "2024-12-20",
      startHour: "09",
      startMinute: "00",
      endHour: "10",
      endMinute: "30",
      user: "Jan Kowalski",
      title: "Spotkanie zespołu",
    },
    {
      date: "2024-12-20",
      startHour: "14",
      startMinute: "00",
      endHour: "15",
      endMinute: "00",
      user: "Anna Nowak",
      title: "Rekrutacja",
    },
    {
      date: "2024-12-21",
      startHour: "11",
      startMinute: "00",
      endHour: "12",
      endMinute: "30",
      user: "Piotr Wiśniewski",
    },
  ];

  const hours = Array.from({ length: 14 }, (_, i) => (i + 8).toString().padStart(2, "0")); // 08:00 - 21:00
  const minutes = ["00", "15", "30", "45"];

  const occupiedSlotsForDate = useMemo(() => {
    return occupiedSlots.filter((slot) => slot.date === selectedDate).sort((a, b) => {
        const timeA = parseInt(a.startHour) * 60 + parseInt(a.startMinute);
        const timeB = parseInt(b.startHour) * 60 + parseInt(b.startMinute);
        return timeA - timeB;
    });
  }, [selectedDate]);

  const isTimeRangeOccupied = (sHour: string, sMin: string, eHour: string, eMin: string): boolean => {
    if (!selectedDate || !sHour || !eHour) return false;

    const start = parseInt(sHour) * 60 + parseInt(sMin);
    const end = parseInt(eHour) * 60 + parseInt(eMin);

    if (start >= end) return true; // Invalid range is considered "occupied/blocked"

    return occupiedSlotsForDate.some((slot) => {
      const slotStart = parseInt(slot.startHour) * 60 + parseInt(slot.startMinute);
      const slotEnd = parseInt(slot.endHour) * 60 + parseInt(slot.endMinute);
      
      // Overlap logic: (StartA < EndB) and (EndA > StartB)
      return start < slotEnd && end > slotStart;
    });
  };

  const isCurrentSelectionInvalid = useMemo(() => {
    if (!startHour || !endHour) return false;
    const start = parseInt(startHour) * 60 + parseInt(startMinute);
    const end = parseInt(endHour) * 60 + parseInt(endMinute);
    return start >= end;
  }, [startHour, startMinute, endHour, endMinute]);

  const isCurrentSelectionOccupied = useMemo(() => {
    if (isCurrentSelectionInvalid) return false;
    return isTimeRangeOccupied(startHour, startMinute, endHour, endMinute);
  }, [startHour, startMinute, endHour, endMinute, isCurrentSelectionInvalid, occupiedSlotsForDate]);

  const handleSubmit = () => {
    if (selectedDate && startHour && endHour && title) {
      if (isCurrentSelectionOccupied || isCurrentSelectionInvalid) {
        return;
      }
      // Mock submission
      alert(
        `Symulacja wysłania rezerwacji:\nBudynek: ${building.name}\nSala: ${room.name}\nData: ${selectedDate}\nGodzina: ${startHour}:${startMinute} - ${endHour}:${endMinute}\nTytuł: ${title}`
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Rezerwacja Sali</h1>
        <p className="text-gray-600">
          Ustal termin rezerwacji dla: <span className="font-semibold text-black">{room.name}</span> ({building.name})
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Szczegóły Rezerwacji</h2>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                  <CalendarIcon className="w-4 h-4" />
                  Wybierz datę
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                />
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                    <ClockIcon className="w-4 h-4" />
                    Rozpoczęcie
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Godz</option>
                      {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <select
                      value={startMinute}
                      onChange={(e) => setStartMinute(e.target.value)}
                      className="w-24 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {minutes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                    <ClockIcon className="w-4 h-4" />
                    Zakończenie
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Godz</option>
                      {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <select
                      value={endMinute}
                      onChange={(e) => setEndMinute(e.target.value)}
                      className="w-24 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {minutes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3 text-gray-700">
                  <FileTextIcon className="w-4 h-4" />
                  Tytuł spotkania
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="np. Spotkanie projektowe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Messages */}
              {isCurrentSelectionInvalid && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-800">
                    Godzina zakończenia musi być późniejsza niż rozpoczęcia.
                  </p>
                </div>
              )}

              {isCurrentSelectionOccupied && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Termin zajęty</p>
                    <p className="text-sm text-red-700 mt-1">
                      W wybranym przedziale czasowym odbywa się już inne spotkanie.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!selectedDate || !startHour || !endHour || !title || isCurrentSelectionOccupied || isCurrentSelectionInvalid}
                className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.99] transform"
              >
                Zatwierdź Rezerwację
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule Visualization */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6 h-fit">
            <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
              <span>Harmonogram</span>
              {selectedDate && <span className="text-sm font-normal text-gray-500">{selectedDate}</span>}
            </h3>

            {!selectedDate ? (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Wybierz datę, aby zobaczyć plan dnia</p>
              </div>
            ) : occupiedSlotsForDate.length === 0 ? (
              <div className="text-center py-12 text-green-600 bg-green-50 rounded-xl border border-green-100">
                <p className="font-medium">Cały dzień wolny</p>
                <p className="text-sm opacity-80 mt-1">Brak zaplanowanych spotkań</p>
              </div>
            ) : (
              <div className="space-y-4">
                {occupiedSlotsForDate.map((slot, index) => (
                  <div
                    key={index}
                    className="relative group bg-gray-50 hover:bg-white border border-gray-200 hover:border-black/20 rounded-xl p-4 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                       <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded-md">
                        {slot.startHour}:{slot.startMinute} - {slot.endHour}:{slot.endMinute}
                       </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{slot.title || "Bez tytułu"}</p>
                      <p className="text-sm text-gray-500 mt-1">Rezerwacja: {slot.user}</p>
                    </div>
                    {/* Visual overlap indicator if needed later */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
