import CartManager from "../Dao/managers/MongoCartManager.js";

const cartManager =  new CartManager;

export default class CartController{

    async getCarts (req,res){
        const result = await cartManager.getCarts();
        res.send({result})
    }

    async getCartsById (req,res){
        const id = req.params.cid;
        const result = await cartManager.getCartsById(id);
        console.log(result)
        res.send({result})
    }

    async addCart (req,res){
        const result = await cartManager.addCart();
        res.send({result})
    }

    async addProdToCart (req,res){
        const pid = req.params.pid;
        const cid = req.params.cid;
    
        const result = await cartManager.addProdToCart(pid, cid)
        
        res.send({result})
    }

    async delProdFromCart (req,res){
        const pid = req.params.pid;
        const cid = req.params.cid;
    
        const result = await cartManager.delProdFromCart(pid, cid)
        res.send({result})
    }


    async deleteCart (req,res){
        const id = req.params.cid;
        const result = await cartManager.deleteCart({_id: id});
        res.send({result})
    }

    async editProdFromCart(req,res){
        const pid = req.params.pid;
        const cid = req.params.cid;
        const newQty = req.body.newQty
    
        const result = await cartManager.editProdFromCart(pid, cid, newQty)
        
        res.send({result})
    }

    async Checkout (req,res){
        const id = req.params.cid;
        const result = await cartManager.checkout({_id: id});
        res.send({result})
    }


}