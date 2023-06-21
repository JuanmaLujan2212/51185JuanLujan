import  express  from "express";
import session from 'express-session';
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import passport from "passport";
import { config } from "./config/config.js"

import __dirname from './utils.js';
import ProductManager from "./Dao/managers/MongoProductManager.js";
import productModel from "./Dao/models/products.js";

import sessionRouter from './routes/sessions.router.js'
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import initializePassport from "./config/passport.config.js";

const productManager = new ProductManager();

console.log(config)


const PORT =  config.server.port;
const app = express();
const MONGO = config.mongo.url;

const connection = await mongoose.connect(MONGO)

app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:'CoderSecret',
    resave: false,
    saveUninitialized:false
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter)
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);




const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
})



const io = new Server(server);


io.on('connection',  async socket =>{

    const productos = await productModel.find();
    console.log('Usuario conectado');
    io.emit('product', productos)


    socket.on("addProduct", async data =>{
        await productManager.addProduct(data);
        const productos = await productModel.find();
        io.emit('product', productos);
    })

    socket.on("deleteProduct", async id =>{
        await productManager.deleteProduct(id);
        const productos = await productModel.find();
        io.emit('product', productos);
    })

})
