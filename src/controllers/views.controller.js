import productModel from "../Dao/models/products.js";
import ProductManager from "../Dao/managers/MongoProductManager.js";
import cartManager from "../Dao/managers/MongoCartManager.js";
import cartModel from "../Dao/models/carts.js";

const prodManager = new ProductManager();
const CartManager = new cartManager();

export default class ViewsController{

    async getHomeProducts (req,res){
        const productos = await productModel.find().lean();
        res.render('home', { productos });
    }

    async getRealTimeProducts (req,res){
        res.render('realTimeProducts')
    }

    async getProducts (req,res){
        const { limit = 5, page = 1, sort, query, availability } = req.query;
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);
    
        const options = {
            limit: isNaN(parsedLimit) ? 10 : parsedLimit,
            page: isNaN(parsedPage) ? 1 : parsedPage,
            sort: sort === 'asc' ? 'asc' : sort === 'desc' ? 'desc' : undefined,
            query: query || undefined,
            availability: availability === 'true' ? true : availability === 'false' ? false : undefined,
          };
      
        const result = await prodManager.getProducts(options);
        const user = req.session.user;
    
        res.render('products', { 
            user: user,
            products: result.payload,
            hasPrevPage:result.hasPrevPage,
            hasNextPage:result.hasNextPage,
            prevPage:result.prevPage,
            nextPage:result.nextPage,
         });
    }

    async getProductsById (req,res){
        const productId = req.params.id;
        const product = await prodManager.getProductsById(productId);
        res.render('productDetails', {product} );
    }

    async getCartsById (req,res){
        const id = req.params.cid;
        const result = await CartManager.getCartsById(id);
        res.render('cart', {products: result.products} );
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

    async register(req,res){
        res.render('register')
    }

    async login(req,res){
        res.render('login')
    }

    async profile(req, res) {
        const user = req.session.user;
    
        if (user.rol === 'admin') {
          const products = await productModel.find().lean();
          res.render('adminProfile', { products });
        } else {
            const cart = await cartModel.findById(user.cart).populate('products.product').lean();

            const cartProducts = cart.products.map(cartProduct => {
                return {
                    _id: cartProduct._id,
                    quantity: cartProduct.quantity,
                    product: cartProduct.product
                };
            });
    
            res.render('userProfile', { cart: cartProducts });
        }
      }

    async publicAcces (req,res,next){
        if(req.session.user) return res.redirect('/profile');
        next();
      }
      
    async privateAcces (req,res,next){
        if(!req.session.user) return res.redirect('/login');
        next();
    }


}