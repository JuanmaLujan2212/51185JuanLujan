import ticketModel from "../models/ticket.js";

export default class ProductManager{

    getAllTickets = async ()=>{
        try {   
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al tratar de traer todos los tickets.")
        }
    }

    getTicketById = async(id)=>{
        try {
            const ticket = await ticketModel.findById(id);
            if(!ticket){
                throw new Error("El ticket no existe.");
            }
            return ticket;
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al tratar de traer el ticket.")
        }
    }

    createTicket = async (ticket)=>{
        try {
            const ticketCreated = await ticketModel.create(ticket)
            return ticketCreated;
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al tratar de traer el ticket")
        }
    }

    updateTicket = async (id, ticket)=>{
        try {
            const ticketUpdate = await ticketModel.findByIdAndUpdate(id,ticket, {new: true})
            return ticketUpdate;
        } catch (error) {
            console.log(error.message)
            throw new Error("Hubo un error al tratar de actualizar el ticket.")
        }
    }

}