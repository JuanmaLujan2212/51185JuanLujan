import TicketManager from "../Dao/managers/MongoTicketManager.js";
import { v4 as uuidv4 } from "uuid";
import { transporter } from "../config/gmail.js";


const ticketManager =  new TicketManager();


export default class TicketController{

    async getAllTickets (req,res){
        try {
            const orderId = req.params.oid;
            const order = await ticketManager.getAllTickets(orderId);
            res.send({status:"success", result:order})
        } catch (error) {
            req.logger.error(error);
            res.send({status:"error", result:error.message})

        }
    }

    async getTicketById (req,res){
        try {
            const orderId = req.params.oid;
            const order = await ticketManager.getTicketById(orderId);
            res.send({status:"success", result:order})
        } catch (error) {
            req.logger.error(error);
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

            console.log(orderCreated)

            const emailTemplate = `<div>
            <h1>Gracias por comprar!!</h1>
            <p>Codigo de orden: ${orderCreated.code}</p>
            <p>Costo de la orden: $${orderCreated.amount}</p>
            <p>Fecha de la compra: ${orderCreated.purchase_datetime}</p>
            </div>`;

            try {
                const contenido = await transporter.sendMail({
                    from:"Ecommerce",
                    to: purchaser,
                    subject:"Compra finalizada",
                    html: emailTemplate
                })
                res.send({status:"success", result:orderCreated})

            } catch (error) {
                req.logger.error(error);
                res.json({status:"error", message: "Hubo un error al enviar el mail con el ticket"})
            }   


        } catch (error) {
            req.logger.error(error);
            res.send({status:"error", result:error.message})
        }
    }

}