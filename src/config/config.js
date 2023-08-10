import dotenv from "dotenv";

dotenv.config();

export const config = {
    server: {
        port: process.env.PORT
    },
    mongo: {
        url:  process.env.MONGO
    },
    gmail: {
        adminAccount: process.env.ADMIN_EMAIL,
        adminPass: process.env.ADMIN_PASS,
        emailToken:process.env.SECRET_TOKEN_EMAIL
    }
}