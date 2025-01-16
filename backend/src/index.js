import express from 'express';
import connect from './config/database.js';
import cors from 'cors';
import { PORT } from './config/config.js';
import {logger} from "./config/logger.js";
import morgan from 'morgan';
import apiRoutes from "./routes/index.js";
import passport from 'passport';
import {passportAuth} from "./config/jwt-middleware.js"


const app = express();

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream:{
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3]
                };
            logger.info(JSON.stringify(logObject));
        }
    } 
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);
app.use(passport.initialize());
passportAuth(passport);



const setupAndStartServer = function(){
    app.listen(PORT, async() =>{ 
        console.log(`Server started on port: ${PORT}`);
        await connect();
        console.log('Mongo db connected');
    }
    );
}

setupAndStartServer();


