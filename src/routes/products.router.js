import { Router } from "express";
import ProductManager from "../Dao/managers/MongoProductManager.js";


const router = Router();
const productManager = new ProductManager();


router.get('/', async (req,res)=>{
    const { limit = 10, page = 1, sort, query, availability } = req.query;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const options = {
        limit: isNaN(parsedLimit) ? 10 : parsedLimit,
        page: isNaN(parsedPage) ? 1 : parsedPage,
        sort: sort === 'asc' ? 'asc' : sort === 'desc' ? 'desc' : undefined,
        query: query || undefined,
        availability: availability === 'true' ? true : availability === 'false' ? false : undefined,
      };
  
    const result = await productManager.getProducts(options);
    return res.send(result.payload)
})

router.get('/:pid', async (req,res)=>{
    const id = req.params.pid;

    const result = await productManager.getProductsById(id);
    res.send({result})
})

router.post('/', async (req,res)=>{
    const prod = req.body;
    const result = await productManager.addProduct(prod);
    res.send({result})
})

router.delete('/:pid', async (req,res)=>{
    const id = req.params.pid;
    const result = await productManager.deleteProduct(id);
    res.send({result})

})

router.put('/:pid', async (req,res)=>{
    const newProd = req.body;
    const id = req.params.pid;

    const result = await productManager.updateProduct(id,newProd);
    res.send({result})
    
})

export default router;