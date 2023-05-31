import { Router } from "express";
import productModel from "../Dao/models/products.js";
import ProductManager from "../Dao/managers/MongoProductManager.js";
import cartManager from "../Dao/managers/MongoCartManager.js";


const prodManager = new ProductManager();
const CartManager = new cartManager();
const router = Router();

router.get('/', async(req,res)=>{
   const productos = await productModel.find().lean();
   res.render('home', { productos });
})

router.get('/realtimeproducts', async(req,res)=>{
    res.render('realTimeProducts')

})

router.get('/products', async (req,res)=>{
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
})

router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await prodManager.getProductsById(productId);
    res.render('productDetails', {product} );
});



router.get('/carts/:cid', async (req,res)=>{
  const id = req.params.cid;
  const result = await CartManager.getCartsById(id);
  res.render('cart', {products: result.products} );
})

const publicAcces = (req,res,next) =>{
  if(req.session.user) return res.redirect('/profile');
  next();
}

const privateAcces = (req,res,next)=>{
  if(!req.session.user) return res.redirect('/login');
  next();
}

router.get('/register', publicAcces, (req,res)=>{
  res.render('register')
})

router.get('/login', publicAcces, (req,res)=>{
  res.render('login')
})

router.get('/profile', privateAcces ,(req,res)=>{
  res.render('profile',{
      user: req.session.user
  })
})
  

export default router;