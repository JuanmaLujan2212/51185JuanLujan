import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import {Faker, en, es } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { config } from './config/config.js';
import multer from "multer";
import path from "path";

export const customFaker = new Faker({
    locale: [en],
})

const { commerce, image, database, string, internet, person, phone, datatype, lorem, boolean } = customFaker;


export const generateProduct = () => {

    return {
        _id: database.mongodbObjectId(),
        title: commerce.productName(),
        price: parseFloat(commerce.price()),
        category: commerce.department(),
        stock: parseInt(string.numeric(2)),
        thumbnail: image.url(),
        code: string.alphanumeric(10),
        description: commerce.productDescription(),
        status: true
    }
}




export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validatePassword = (password, user) => bcrypt.compareSync(password, user.password);

export const generateEmailToken = (email, expireTime)=>{
    const token = jwt.sign({email}, config.gmail.emailToken , {expiresIn:expireTime})
    return token
}

export const verifyEmailToken = (token) =>{
    try {
        const info = jwt.verify(token, config.gmail.emailToken);
        return info.email;
    } catch (error) {
        console.log(error.message)
        return null
    }
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const validFields = (body) => {
    const {name, email, password} = body;
    if(!name || !email || !password){
        return false;
    }else{
        return true;
    }
};

const multerFilterProfile = (req,file,cb)=>{
    const isValid = validFields(req.body);
    if(isValid){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const profileStorage = multer.diskStorage({
    destination: function(req,file,cb) {
      cb(null,path.join(__dirname,"/multer/users/images"))  
    },
    filename: function (req,file,cb) {
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
    
})

export const uploaderProfile = multer({storage:profileStorage,fileFilter:multerFilterProfile })


const documentStorage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"/multer/users/documents"));
    },
    filename: function(req,file,cb) {
        console.log("req.body")
        cb(null,`${req.user.email}-document-${file.originalname}`);
    }
})

export const uploaderDocument = multer({storage:documentStorage});

const productStorage= multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,"/multer/products/images"));
    },
    filename: function(req,file,cb) {
        cb(null,`${req.body.code}-image-${file.originalname}`);
    }
})

export const uploaderProduct = multer({storage:productStorage})