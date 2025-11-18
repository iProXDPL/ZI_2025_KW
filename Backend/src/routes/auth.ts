import express from "express";
import { body, validationResult } from "express-validator";
import { register, login, getMe, users } from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    register(req, res);
  }
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    login(req, res);
  }
);

router.get("/me", auth, getMe);

router.get("/users", users);

export default router;
