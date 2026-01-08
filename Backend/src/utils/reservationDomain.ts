export interface ReservationInput {
  roomId: string;
  date: string;
  start: string;
  end: string;
  title: string;
}

export const validateReservationInput = (input: Partial<ReservationInput>): string | null => {
  if (!input.roomId || !input.date || !input.start || !input.end) {
    return "Wszystkie pola są wymagane";
  }
  return null;
};

export const parseReservationDates = (date: string, start: string, end: string): { startDateTime: Date, endDateTime: Date } | null => {
  const startDateTime = new Date(`${date}T${start}:00`);
  const endDateTime = new Date(`${date}T${end}:00`);

  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    return null;
  }
  
  return { startDateTime, endDateTime };
};

export const validateReservationDates = (startDateTime: Date, endDateTime: Date): string | null => {
  if (startDateTime >= endDateTime) {
    return "Godzina zakończenia musi być później niż rozpoczęcia";
  }
  return null;
};
