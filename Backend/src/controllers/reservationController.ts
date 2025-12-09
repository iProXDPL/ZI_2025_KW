import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import Room from "../models/Room";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { roomId, date, start, end, title } = req.body;

    if (!roomId || !date || !start || !end) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala nie znaleziona" });
    }

    const startDateTime = new Date(`${date}T${start}:00`);
    const endDateTime = new Date(`${date}T${end}:00`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        return res.status(400).json({ message: "Nieprawidłowy format daty lub godziny" });
    }

    if (startDateTime >= endDateTime) {
      return res.status(400).json({ message: "Godzina zakończenia musi być później niż rozpoczęcia" });
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
