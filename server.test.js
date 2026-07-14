import request from "supertest"
import homerouter from "./Router/homerouter.js"
import express from "express";
const app = express();

app.use("/", homerouter);
describe("/home", () => {
    it("/home", async () => {
        const res = await request(app).get("/home");
        expect(res.statusCode).toBe(200);
    })
})
describe("router test", () => {
    it("/home testing", async () => {
        const res = await request(app).get("/home");
        expect(res.body.success).toBe(true);
    })
})
describe("Message", () => {
    it("testing api returned message", async () => {
        const res = await request(app).get("/home");
        expect(res.body.message).toBe('Home route is working');
    })
})
