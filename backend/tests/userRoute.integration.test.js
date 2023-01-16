import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import dotenv from 'dotenv';

dotenv.config({ path: '././config.env' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    console.log(process.env.DATABASE);
    await mongoose.connect('mongodb://localhost:27017/contentdb');
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('UserController Test Suite', () => {
    test('get should return an array of users', async () => {
        let response = await request(app).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    })


    describe("GET /api/v1/users:id", () => {
        it("should return a users", async () => {
            const res = await request(app).get(
                "/api/v1/users/63c49e8e4595b6f0395d570d"
            );
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe("demo user");
        });
    });

    // describe("POST /api/v1/users", () => {
    //     it("should create a user", async () => {
    //         const res = await request(app).post("/api/v1/users").send({
    //             "name": "test user",
    //             "email": "testuser2@gemail.com",
    //             "password": "12345678",
    //             "passwordConfirm": "12345678"
    //         });
    //         expect(res.statusCode).toBe(201);

    //     });
    // });

    describe("PUT /api/v1/users/:id", () => {
        it("should update a users", async () => {
            const user = await request(app).get(
                "/api/v1/users/63c4ad9dec16d40eb5d41c10"
            );
            console.log(user.body);
            const res = await request(app)
                .patch("/api/v1/users/63c4ad9dec16d40eb5d41c10")
                .send({...user.body,
                    "name": "test user 1",                            
                });
            expect(res.statusCode).toBe(200);
            expect(res.body._id).toBe('63c4ad9dec16d40eb5d41c10');
        });
    });

    // describe("DELETE /api/v1/users/:id", () => {
    //     it("should delete a users", async () => {
    //         const res = await request(app).delete(
    //             "/api/v1/users/63c4abe8214078ba3eb480ad"
    //         );
    //         expect(res.statusCode).toBe(200);
    //     });
    // });



})
