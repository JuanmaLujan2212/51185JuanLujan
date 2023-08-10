import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";

const viewsController = new ViewsController();

const router = Router();

router.get('/', viewsController.getHomeProducts);

router.get('/forgotPassword', viewsController.forgotPassword);

router.get("/reset-password",(req,res)=>{
    const token = req.query.token;
    res.render("resetPassword",{token});
});

router.get('/chat', viewsController.chat);

router.get('/realtimeproducts', viewsController.getRealTimeProducts);

router.get('/products', viewsController.getProducts);

router.get('/products/:id', viewsController.getProductsById);

router.get('/carts/:cid', viewsController.getCartsById);

router.get('/register', viewsController.publicAcces , viewsController.register)

router.get('/login', viewsController.publicAcces, viewsController.login)

router.get('/profile', viewsController.privateAcces , viewsController.profile)

router.get('/getProfile', viewsController.privateAcces , viewsController.getProfile)
  

export default router;