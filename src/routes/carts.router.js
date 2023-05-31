import { Router } from "express";
import cartManager from "../Dao/managers/MongoCartManager.js";
import cartModel from "../Dao/models/carts.js";

const CartManager = new cartManager();
const router = Router();


router.get('/', async (req,res)=>{
    const result = await CartManager.getCarts();
    res.send({result})
})

router.get('/:cid', async (req,res)=>{
    const id = req.params.cid;
    const result = await CartManager.getCartsById(id);
    console.log(result)
    res.send({result})
})

router.post('/', async (req,res)=>{

    const result = await CartManager.addCart();
    res.send({result})
})

router.post('/:cid/product/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const cid = req.params.cid;

    const result = await CartManager.addProdToCart(pid, cid)
    
    res.send({result})

})

router.delete('/:cid', async (req,res)=>{
    const id = req.params.cid;
    const result = await CartManager.deleteCart({_id: id});
    res.send({result})
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const cid = req.params.cid;

    const result = await CartManager.delProdFromCart(pid, cid)
    res.send({result})
})

router.put('/:cid/product/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const cid = req.params.cid;
    const newQty = req.body.newQty

    const result = await CartManager.editProdFromCart(pid, cid, newQty)
    
    res.send({result})

})




export default router;
