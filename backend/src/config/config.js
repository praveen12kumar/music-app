import { config } from 'dotenv';

config({
    path:'./.env'
});

const PORT = process.env.PORT
const DB_URL = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY

export {PORT, DB_URL, JWT_SECRET, JWT_EXPIRY};