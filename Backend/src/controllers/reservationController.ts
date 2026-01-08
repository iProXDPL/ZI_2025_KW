import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import Room from "../models/Room";
import { 
  validateReservationInput, 
  parseReservationDates, 
  validateReservationDates 
} from "../utils/reservationDomain";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { roomId, date, start, end, title } = req.body;

    const inputError = validateReservationInput({ roomId, date, start, end });
    if (inputError) {
      return res.status(400).json({ message: inputError });
    }

    const parsedDates = parseReservationDates(date, start, end);
    if (!parsedDates) {
      return res.status(400).json({ message: "Nieprawidłowy format daty lub godziny" });
    }
    const { startDateTime, endDateTime } = parsedDates;

    const logicError = validateReservationDates(startDateTime, endDateTime);
    if (logicError) {
      return res.status(400).json({ message: logicError });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala nie znaleziona" });
    }

    const conflict = await Reservation.findOne({
      room: roomId,
      startTime: { $lt: endDateTime },
      endTime: { $gt: startDateTime }
    });

    if (conflict) {
      return res.status(409).json({ message: "Termin jest już zajęty" });
    }

    const reservation = new Reservation({
      room: roomId,
      user: (req as any).user?.id,
      startTime: startDateTime,
      endTime: endDateTime,
      title
    });

    await reservation.save();
    res.status(201).json(reservation);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const getReservationsByRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { date } = req.query;

    if (!roomId) {
        return res.status(400).json({ message: "Room ID is required" });
    }

    const query: any = { room: roomId };

    if (date) {
        const startOfDay = new Date(`${date}T00:00:00`);
        const endOfDay = new Date(`${date}T23:59:59`);
        
        if (!isNaN(startOfDay.getTime())) {
             query.startTime = { $gte: startOfDay, $lte: endOfDay };
        }
    }

    const reservations = await Reservation.find(query)
      .populate("user", "name email")
      .sort({ startTime: 1 });
    res.json(reservations);

  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};
