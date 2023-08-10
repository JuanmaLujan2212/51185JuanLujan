import { EError } from "../services/EError.js";

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EError.ROUTING_ERROR:
            res.json({status:"error", message: error.message})
            break;

        case EError.DATABASE_ERROR:
            res.status(500).json({status:"error", message: error.message})
            break;   

        case EError.INVALID_JSON:
            res.status(400).json({status:"error", message: error.message})
            break;  

        case EError.AUTH_ERROR:
            res.json({status:"error", message: error.message})
            break;

        case EError.INVALID_PARAM:
            res.json({status:"error", message: error.message})
            break;

        default:
            res.json({status:"error", message: error.message})
            break;

             

    }
    next();
}
