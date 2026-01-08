import express from "express";
import { getRooms, createRoom } from "../controllers/roomController";
import { auth } from "../middleware/auth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sale
 *   description: Zarządzanie salami
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Pobierz listę wszystkich sal
 *     tags: [Sale]
 *     responses:
 *       200:
 *         description: Lista sal
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
 *                   building:
 *                     type: string
 *                     description: ID budynku lub obiekt budynku
 *                   capacity:
 *                     type: integer
 *                   floor:
 *                     type: integer
 */
router.get("/", getRooms);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Dodaj nową salę
 *     tags: [Sale]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, buildingId]
 *             properties:
 *               name:
 *                 type: string
 *               buildingId:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               floor:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sala dodana pomyślnie
 *       400:
 *         description: Błąd walidacji
 *       401:
 *         description: Brak autoryzacji
 */
router.post("/", auth, createRoom);

export default router;
