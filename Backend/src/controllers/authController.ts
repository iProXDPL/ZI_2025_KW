import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { AuthRequest } from "../middleware/auth";

const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(400).json({ message: "Email już istnieje" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      message: "Utworzono użytkownika",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Nieprawidłowy email lub hasło" });

    const token = generateToken(user);
    res.json({
      message: "Zalogowano pomyślnie",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    res.json({ user });
  } catch {
    res.status(500).json({ message: "Błąd serwera" });
  }
};
