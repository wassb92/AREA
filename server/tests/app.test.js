const request = require("supertest");
const app = require("../app");
const server = require("../server");

const BASE_URL = `http://localhost:${process.env.PORT}`;

describe("Authentification tests", () => {
    test("/register", async () => {
        await request(BASE_URL)
        .post("/api/auth/register")
        .expect("Content-Type", "application/json; charset=utf-8")
        .send({
            email: "marczhou91@outlook.fr",
            password: "test",
        })
        .expect(200)
    });
})