import express from "express";
import { body, validationResult } from "express-validator";
import { getRooms, createRoom } from "../controllers/roomController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getRooms);

router.post(
  "/",
  auth,
  [
    body("name").notEmpty().withMessage("Nazwa jest wymagana"),
    body("buildingId").notEmpty().withMessage("ID budynku jest wymagane"),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createRoom
);

export default router;
