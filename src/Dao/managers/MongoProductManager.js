import productModel from "../models/products.js";
import ManagerAccess from "./ManagerAccess.js";
import { generateProduct } from "../../utils.js";
import { EError } from "../../services/EError.js";
import { CustomError } from "../../services/customError.service.js";
import { generateProductErrorInfo } from "../../services/productErrorinfo.js";

const managerAccess = new ManagerAccess();

export default class ProductManager{

    existProduct = async (id_producto)=>{
        try {
            const result = await productModel.find({ _id: id_producto }).lean();;
            if (result.length === 0) {
              return false;
            } else {
              return result;
            }
          } catch (error) {
            console.error('Error al validar el producto');
          }
    }

    getProducts = async(options)=>{
        await managerAccess.crearRegistro('CONSULTA PRODS');
      
        const query = options.query ? { category: options.query } : {};
        if (options.availability !== undefined) {
            query.status = options.availability;
          }
        const sortOptions = { price: options.sort === 'asc' ? 1 : -1 };

        
        
        const { docs,totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await productModel.paginate(query, {
          limit: options.limit,
          page: options.page,
          sort: sortOptions,
          lean: true
        });

        const response = {
            status: 'success',
            payload: docs, 
            totalPages: totalPages,
            prevPage: prevPage, 
            nextPage: nextPage, 
            page: options.page, 
            hasPrevPage: hasPrevPage, 
            hasNextPage: hasNextPage, 
          };

        // console.log(response)  
      
        return response;
    }

    getProductsById = async (id_producto)=>{
        await managerAccess.crearRegistro('CONSULTA UN PROD')

        const exist = await this.existProduct(id_producto);

        if(exist){
            return exist
        }else{
            return 'not found'
        }
    }

    deleteProduct = async (id_producto, user)=>{
        await managerAccess.crearRegistro('BORRAR UN PROD')

        const exist = await this.existProduct(id_producto)
        const prod = await productModel.findById(id_producto);

        if(exist){
          if(user.rol === "premium"){
            if(user.email !== prod.owner){
              return 'No puede eliminar el producto porque no fue creado por usted'
            }
          }
            const result = await productModel.deleteOne({ _id: id_producto });
            return result
        }else{
            return 'not found'
        }
    }

    addProduct = async (product, user) => {
      await managerAccess.crearRegistro('ALTA PROD');
 
      const { title, description, code, price, stock, category, thumbnail, status } = product;
    
     if(!title || !description || !code || !price || !stock || !category || !thumbnail || !status){
        CustomError.createError({
          name: "Create product error",
          cause: generateProductErrorInfo(product),
          message: "An error ocurred",
          errorCode: EError.INVALID_JSON,
      });
     }

     const productWithOwner = {
      ...product,
      owner: user.email,
    };
    
      const result = await productModel.create(productWithOwner);
      console.log('Producto creado con éxito!');
      return result;
    };

    updateProduct = async (id_producto, newProd)=>{
        await managerAccess.crearRegistro('ACTUALIZAR UN PROD')

        const exist = await this.existProduct(id_producto)

        if(exist){
            const result = await productModel.updateOne({_id: id_producto},{$set: newProd});
            return result
        }else{
            return 'product not found'
        }

    }

    mockingProducts = async ()=>{
        let products = [];
        for (let i = 0; i < 100; i++) {
            const prod = generateProduct();
            products.push(prod)
        }
        return products
    }

}