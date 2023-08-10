import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import {Faker, en, es } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import { config } from './config/config.js';

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