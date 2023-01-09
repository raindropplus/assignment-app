import request from "supertest";
import app from "../src/app";
import { getAllUsers } from './../src/services/userService';

jest.mock('../src/services/userService');

describe('UserController Test Suite', () => {
    test('get should return an array of users', async () => {
        let response = await request(app).get('/api/v1/users');
        expect(response.statusCode).toBe(200);
        let users = response.body;
        expect(users.length).toBeGreaterThan(0);
        expect(users[0].id).toBe('1');
    })

    test('post should return saved id', async () => {
        let user = { email:'test@gmail.com' };
        let response = await request(app).post('/api/v1/users').send(user);
        expect(response.statusCode).toBe(201);
        let body = response.body;
        expect(body.length).toBe(24);
        let savedUserResponse = await request(app).get('/api/v1/users/' + body);
        let savedUser = savedUserResponse.body;
        expect(savedUser.createdAt).not.toBe(null);
        expect(savedUser.email).toBe(user.email);
    })

    test('get by id should return an user', async () => {
        let response = await request(app).get('/api/v1/users/1');
        let user = response.body;
        expect(user.id).toBe('1');        
    })

    test('put should update an existing user', async () => {
        let user = { id: '1', name: 'test001', email:'test@gmail.com',image:'456' };
        let response = await request(app).put('/api/v1/users').send(user);
        expect(response.statusCode).toBe(200);
        let updatedUserResponse = await request(app).get('/api/v1/users/1');
        let updatedUser = updatedUserResponse.body;        
        expect(updatedUser.name).toBe(user.name);
    })

     test('delete by id should return success message', async () => {
         let response = await request(app).delete('/api/v1/users/1');
         expect(response.statusCode).toBe(200);
         let deletedUserResponse = await request(app).get('/api/v1/users/1');
         expect(deletedUserResponse.statusCode).toBe(404);
         let deletedUser = deletedUserResponse.body;
         expect(deletedUser.message).toBe('User not found by the id: 1');
     })
    
})
