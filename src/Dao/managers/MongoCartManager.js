import cartModel from '../models/carts.js'
import ManagerAccess from "./ManagerAccess.js";
import ProductModel from "../models/products.js";
import userModel from '../models/user.js';
import TicketManager from "./MongoTicketManager.js";
import { transporter } from '../../config/gmail.js';


const managerAccess = new ManagerAccess();
const ticketManager = new TicketManager();

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

    checkout = async (id_cart) => {
      await managerAccess.crearRegistro('CheckOut');

      const cart = await this.getCartsById(id_cart)
      const products = cart.products

      const user = await userModel.findOne({ cart: cart._id });

      let totalPrice = 0;

      for (const item of products) {
        const product = item.product;
        const quantity = item.quantity;
    
        const updatedProduct = await ProductModel.findById(product._id);
    
        if (updatedProduct.stock >= quantity) {
          updatedProduct.stock -= quantity;
          await updatedProduct.save();
          totalPrice += product.price * quantity;
          await this.delProdFromCart(product._id, id_cart);
          
        } else {
          console.log(`El producto ${product.title} no tiene suficiente stock`);
        }
      }

      const bodyData = {
        purchaser: user.email,
        amount: totalPrice
      }

      fetch('http://localhost:8080/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });

    
    
      return cart;


    };



}