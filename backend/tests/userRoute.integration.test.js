import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import dotenv from 'dotenv';

dotenv.config({path: '././config.env'});

/* Connecting to the database before each test. */
beforeEach(async () => {
    console.log(process.env.DATABASE);
    await mongoose.connect('mongodb://localhost:27017/contentdb');
},5000);
  
  /* Closing database connection after each test. */
//   afterEach(async () => {
//     await mongoose.connection.close();
//   });
// connectWithDb();
describe('UserController Test Suite', () => {
    test('get should return an array of users', async () => {
        let response = await request(app).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
    //     let users = response.body;
    //     expect(users.length).toBeGreaterThan(0);
    //     expect(users[0].id).toBe('1');
     })


    
})
