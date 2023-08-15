import ProductManager from "../Dao/managers/MongoProductManager.js";

const productManager =  new ProductManager();

export default class ProductController{

    async getProducts(req, res) {
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
    
        try {
          const result = await productManager.getProducts(options);
          res.status(200).json({ status: "success", payload: result.payload });
        } catch (error) {
          res.status(400).json({ status: "error", message: "Error al obtener los productos" });
        }
      }

    async getProductsById (req,res){
        const id = req.params.pid;

        const result = await productManager.getProductsById(id);
        res.send({result})
    }

    async addProduct(req, res) {
        const prod = req.body;
        const user = req.session.user;
    
        try {
          const result = await productManager.addProduct(prod, user);
          res.status(200).json({ message: "Producto creado con éxito", data: result });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

    async deleteProduct (req,res){
        const id = req.params.pid;
        const user = req.session.user
        const result = await productManager.deleteProduct(id, user);
        res.send({result})
    }

    async updateProduct(req,res){
        const newProd = req.body;
        const id = req.params.pid;
    
        const result = await productManager.updateProduct(id,newProd);
        res.send({result})
    }

    async mockingProducts(req,res){
        const result = await productManager.mockingProducts();
        res.send({result})
    }


}