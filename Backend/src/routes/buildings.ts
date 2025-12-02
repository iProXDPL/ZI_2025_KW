import express from "express";
import { body, validationResult } from "express-validator";
import { getBuildings, createBuilding } from "../controllers/buildingController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getBuildings);

router.post(
  "/",
  auth,
  [
    body("name").notEmpty().withMessage("Nazwa jest wymagana"),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createBuilding
);

export default router;
