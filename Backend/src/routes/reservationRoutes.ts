import { Router } from "express";
import { createReservation, getReservationsByRoom } from "../controllers/reservationController";

import { auth } from "../middleware/auth";



const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rezerwacje
 *   description: Zarządzanie rezerwacjami sal
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Utwórz nową rezerwację
 *     tags: [Rezerwacje]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [roomId, date, start, end]
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: ID sali
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data rezerwacji (YYYY-MM-DD)
 *               start:
 *                 type: string
 *                 description: Godzina rozpoczęcia (HH:mm)
 *               end:
 *                 type: string
 *                 description: Godzina zakończenia (HH:mm)
 *               title:
 *                 type: string
 *                 description: Opcjonalny tytuł spotkania
 *     responses:
 *       201:
 *         description: Rezerwacja utworzona pomyślnie
 *       400:
 *         description: Błąd walidacji lub nieprawidłowe godziny
 *       409:
 *         description: Termin jest już zajęty
 *       401:
 *         description: Brak autoryzacji
 */
router.post("/", auth, createReservation);

/**
 * @swagger
 * /api/reservations/{roomId}:
 *   get:
 *     summary: Pobierz rezerwacje dla sali
 *     tags: [Rezerwacje]
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID sali
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Opcjonalna data do filtrowania (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista rezerwacji
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                   title:
 *                     type: string
 */
router.get("/:roomId", getReservationsByRoom);

export default router;
