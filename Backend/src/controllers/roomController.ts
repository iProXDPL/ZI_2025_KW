import { Request, Response } from "express";
import Room from "../models/Room";
import Building from "../models/Building";

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find().populate("building", "name");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, buildingId, capacity, type, floor } = req.body;
    
    if (!name || !buildingId) {
      return res.status(400).json({ message: "Nazwa sali i ID budynku są wymagane" });
    }

    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ message: "Budynek nie znaleziony" });
    }

    if (building.floors !== undefined && floor > building.floors) {
      return res.status(400).json({ 
        message: `Piętro nie może być wyższe niż liczba pięter w budynku (${building.floors})` 
      });
    }

    const existing = await Room.findOne({ name, building: buildingId });
    if (existing) {
      return res.status(400).json({ message: "Sala o tej nazwie już istnieje w tym budynku" });
    }

    const room = new Room({
      name,
      building: buildingId,
      capacity,
      type,
      floor
    });
    await room.save();
    
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};
