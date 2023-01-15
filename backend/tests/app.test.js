import request from "supertest";
import app from "../src/app";
//import { connectWithDb } from "../src/mongo";



describe("Test application", () => {
  test("Not found for site 404", async () => {
    const res = await request(app).get("/wrong-endpoint")
    expect(res.statusCode).toEqual(404)
  })

  test("Health check route returns valid response", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: "valid response" })
  })
})



