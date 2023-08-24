import { Router } from "express";
import { UserController } from "../controllers/user.controller.js"
import { uploaderDocument } from "../utils.js";

const router = Router();

router.put("/premium/:uid" , UserController.changeRol);

router.put("/:uid/documents",
uploaderDocument.fields(
    [{name:"identificacion",maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"estadoDeCuenta", maxCount:1}]), 
UserController.updateUserDocument
)

export {router as usersRouter};