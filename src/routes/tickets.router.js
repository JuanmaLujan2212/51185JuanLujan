import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";

const ticketController = new TicketController()
const router = Router();

router.get("/", ticketController.getAllTickets);
router.get("/:oid", ticketController.getTicketById);
router.post("/", ticketController.createTicket);

export default router;