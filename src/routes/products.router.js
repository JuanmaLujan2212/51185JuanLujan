import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductsById);
router.post('/', productController.addProduct);
router.delete('/:pid', productController.deleteProduct);
router.put('/:pid', productController.updateProduct);
router.post('/mockingproducts', productController.mockingProducts);


export default router;