import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({path: '././config.env'});

//const database = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const database = process.env.DATABASE;

const options = {};


export const connectWithDb = () => {
    mongoose.connect(database, options, (err, db) => {
        if (err) {
            console.error(err);
        }
        else console.log('DB connection Successfully!');
    });
};