import { Router } from "express";
import { addLogger } from "../utils/logger.js";
import TicketController from "../controllers/ticket.controller.js";

const ticketController = new TicketController()
const router = Router();

router.use(addLogger);

router.get("/", ticketController.getAllTickets);
router.get("/:oid", ticketController.getTicketById);
router.post("/", ticketController.createTicket);

export default router;