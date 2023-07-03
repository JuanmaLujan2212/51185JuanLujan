import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductsById);
router.post('/', productController.addProduct);
router.delete('/:pid', productController.deleteProduct);
router.put('/:pid', productController.updateProduct);


export default router;