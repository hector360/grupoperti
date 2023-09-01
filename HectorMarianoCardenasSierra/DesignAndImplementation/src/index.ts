import mongoose from "mongoose";
import { app } from './app';
import dotenv from 'dotenv';
dotenv.config();

const start = async () => {
    try {
        if(!process.env.MONGO_URI){
            throw new Error('MONGO_URI must be defined');
        }
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDb')
    } catch(error) {
        console.log(error);
    }

    app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`)
    })
}
start();