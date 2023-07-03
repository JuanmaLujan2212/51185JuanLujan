import TicketManager from "../Dao/managers/MongoTicketManager.js";
import { v4 as uuidv4 } from "uuid";

const ticketManager =  new TicketManager();


export default class TicketController{

    async getAllTickets (req,res){
        try {
            const orderId = req.params.oid;
            const order = await ticketManager.getAllTickets(orderId);
            res.send({status:"success", result:order})
        } catch (error) {
            res.send({status:"error", result:error.message})
        }
    }

    async getTicketById (req,res){
        try {
            const orderId = req.params.oid;
            const order = await ticketManager.getTicketById(orderId);
            res.send({status:"success", result:order})
        } catch (error) {
            res.send({status:"error", result:error.message})
        }
    }

    async createTicket (req,res){
        try {
            const { purchaser, amount } = req.body;
            const id = uuidv4();
            const newOrder = {
                code: id,
                amount: amount,
                purchaser: purchaser
            }
            const orderCreated = await ticketManager.createTicket(newOrder)
            res.send({status:"success", result:orderCreated})
        } catch (error) {
            res.send({status:"error", result:error.message})
        }
    }

}