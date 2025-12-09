import { Router } from "express";
import { createReservation, getReservationsByRoom } from "../controllers/reservationController";

import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, createReservation);
router.get("/:roomId", getReservationsByRoom);

export default router;
