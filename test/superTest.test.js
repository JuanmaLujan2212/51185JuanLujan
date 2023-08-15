import chai from "chai";
import supertest from "supertest";
import userModel from "../src/Dao/models/user.js";
import productModel from "../src/Dao/models/products.js";
import {app} from "../src/app.js";
import cartModel from "../src/Dao/models/carts.js";
import { generateEmailToken } from "../src/utils.js";

const expect = chai.expect;
const requester = supertest(app);

describe("Testing de App", ()=>{
    describe("Testing de modulo de productos", ()=>{
        beforeEach(async function(){
            await productModel.deleteMany({})
        })
        it("El endpoint debe crear producto", async function(){
            const productMock = {
                title: "Producto",
                description: "Este es un producto de ejemplo",
                code: 133,
                price: 9.99,
                stock: 10,
                category: "Fruta",
                thumbnail: "img",
                status: true
            }
            const result = await requester.post("/api/products/").send(productMock)
            expect(result.statusCode).to.be.equal(200);
        });
        it("Al crear un producto sin algun campo debe devolver con un status: 400", async function(){
            const productMock = {
                description: "Este es un producto de ejemplo",
                code: 133,
                price: 9.99,
                stock: 10,
                category: "Fruta",
                thumbnail: "img",
                status: true
            }
            const result = await requester.post("/api/products/").send(productMock)
            expect(result.statusCode).to.be.equal(400);
        });

        it("Al crear un producto con un campo erroneo debe devolver con un status: 400", async function(){
            const productMock = {
                description: "Este es un producto de ejemplo",
                code: 133,
                price: "Caro",
                stock: 10,
                category: "Fruta",
                thumbnail: "img",
                status: true
            }
            const result = await requester.post("/api/products/").send(productMock)
            expect(result.statusCode).to.be.equal(400);
        });

        it("Al obtener a los productos con el método GET, la respuesta debe tener los campos status y payload", async function(){
            const response = await requester.get("/api/products");
            expect(response.statusCode).to.be.equal(200);
            expect(response.body).to.haveOwnProperty("status");
            expect(Array.isArray(response.body.payload)).to.deep.equal(true);
        });
    })

    describe("Testing de modulo de carritos", ()=>{
        beforeEach(async function(){
            await cartModel.deleteMany({})
        })
        it("El endpoint debe crear un carrito", async function(){ 
            const result = await requester.post("/api/carts/");
            expect(result.status).to.be.equal(200);
            
        });

        it("Al obtener los carritos, debe devolver un status de 200", async function(){
            const result = await requester.get("/api/carts");         
            expect(result.status).to.be.equal(200);
        });

    
    })

    describe("Testing de modulo de usuario y session", ()=>{
        before(async function(){
            await userModel.deleteMany({})
        })

        it("Registro de un usuario", async function(){

            const userMock = {
                first_name:"juan",
                last_name:"perez",
                email:"juanma@gmail.com",
                rol: "user",
                age: 13,
                password:"1234"
            }

            const responseSignup = await requester.post("/api/sessions/register").send(userMock);

            expect(responseSignup.statusCode).to.be.equal(200);

        })
        
    })
})
