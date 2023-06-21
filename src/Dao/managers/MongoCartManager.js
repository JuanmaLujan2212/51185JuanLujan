import cartModel from '../models/carts.js'
import ManagerAccess from "./ManagerAccess.js";
const managerAccess = new ManagerAccess();

export default class cartManager{

    existCarts = async (id_cart)=>{
        try {
            const result = await cartModel.find({ _id: id_cart });
            if (result.length === 0) {
              return false;
            } else {
              return result;
            }
          } catch (error) {
            console.error('Error al validar el carrito');
          }
    }

    getCarts = async()=>{
        await managerAccess.crearRegistro('CONSULTA CARTS')
        const result = await cartModel.find();
        return result
    }

    getCartsById = async (id_cart)=>{
        await managerAccess.crearRegistro('CONSULTA UN CART')

        const cart = await cartModel.findById(id_cart).populate("products.product").lean();

        return cart
    }

    deleteCart = async (id_cart) => {
      await managerAccess.crearRegistro('VACIAR UN CART');
    
      const result = await cartModel.updateOne(
        { _id: id_cart },
        { $set: { products: [] } }
      );
    
      return result;
    };

    addCart = async ()=>{
        await managerAccess.crearRegistro('CREAR UN CART')

        let carrito = {
            products:[]
        }
        
        const result = await cartModel.create(carrito)

        return result
       
    }

    addProdToCart = async (id_producto, id_cart) => {
      await managerAccess.crearRegistro('CREAR UN CART')

      const cart = await cartModel.findById(id_cart);
    
      const existingProduct = cart.products.find(
        (product) => product.product.toString() === id_producto
      );
    
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const newProduct = {
        product: id_producto,
        quantity: 1,
        };
        cart.products.push(newProduct);
      }
    
      await cart.save();
    
      return cart;
    };

    delProdFromCart = async (id_producto, id_cart) => {
      await managerAccess.crearRegistro('ELIMINAR DE UN CART');

      const cart = await cartModel.findOneAndUpdate(
        { _id: id_cart },
        { $pull: { products: { product: id_producto } } },
        { new: true }
      );
    
      return cart;
    };

    editProdFromCart = async (id_producto, id_cart, newQty) => {
      await managerAccess.crearRegistro('EDITAR UN PRODUCTO DEL CART');

      const cart = await cartModel.findOneAndUpdate(
        { _id: id_cart, 'products.product': id_producto }, 
        { $set: { 'products.$.quantity': newQty } },
        { new: true }
      );
    
      return cart;


    };



}