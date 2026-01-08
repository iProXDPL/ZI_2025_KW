import { Request, Response } from "express";
import Building from "../models/Building";
import { validateBuildingInput } from "../utils/buildingDomain";

export const getBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};

export const createBuilding = async (req: Request, res: Response) => {
  try {
    const { name, address, description, floors } = req.body;
    
    const inputError = validateBuildingInput({ name, address, description, floors });
    if (inputError) {
      return res.status(400).json({ message: inputError });
    }

    const existing = await Building.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Budynek o tej nazwie już istnieje" });
    }
    
    const building = new Building({ name, address, description, floors });
    await building.save();
    
    res.status(201).json(building);
  } catch (error) {
    res.status(500).json({ message: "Błąd serwera", error });
  }
};
