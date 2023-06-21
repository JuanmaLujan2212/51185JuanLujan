import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

export const config = {
    server: {
        port: PORT
    },
    mongo: {
        url: MONGO
    }
}