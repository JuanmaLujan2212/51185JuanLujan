import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();
const cartController = new CartController();


router.get('/', cartController.getCarts);

router.get('/:cid', cartController.getCartsById);

router.get('/:cid/purchase', cartController.Checkout);

router.post('/', cartController.addCart);

router.post('/:cid/product/:pid', cartController.addProdToCart);

router.delete('/:cid', cartController.deleteCart)

router.delete('/:cid/product/:pid', cartController.delProdFromCart)

router.put('/:cid/product/:pid', cartController.editProdFromCart)




export default router;
