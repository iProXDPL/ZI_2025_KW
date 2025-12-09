import express from "express";
import { body, validationResult } from "express-validator";
import { getBuildings, createBuilding } from "../controllers/buildingController";
import { auth } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Budynki
 *   description: Zarządzanie budynkami
 */

/**
 * @swagger
 * /api/buildings:
 *   get:
 *     summary: Pobierz listę wszystkich budynków
 *     tags: [Budynki]
 *     responses:
 *       200:
 *         description: Lista budynków
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   floors:
 *                     type: integer
 */
router.get("/", getBuildings);

/**
 * @swagger
 * /api/buildings:
 *   post:
 *     summary: Dodaj nowy budynek
 *     tags: [Budynki]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               floors:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Budynek utworzony
 *       400:
 *         description: Błąd walidacji
 *       401:
 *         description: Brak autoryzacji
 */
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
