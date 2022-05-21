import request from "supertest";
import { app } from "@shared/infra/http/app";

import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create category controller",  () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const passwordHash = await hash("admin", 8);

        await connection.query(
            `INSERT INTO 
                USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
                VALUES('${id}', 'Gustavo admin', 'admin@admin.com.br', '${passwordHash}', true, 'now()', 'XXXXXX-XX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const authResponse = await request(app)
        .post("/sessions")
        .send({
            email: "admin@admin.com.br",
            password: "admin"
        });

        const { token } = authResponse.body;

        const response = await request(app)
        .post("/categories")
        .send({
            name: "Category supertest",
            description: "Description supertest"
        })
        .set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a new category with same name of an already existent", async () => {
        const authResponse = await request(app)
        .post("/sessions")
        .send({
            email: "admin@admin.com.br",
            password: "admin"
        });

        const { token } = authResponse.body;

        const response = await request(app)
        .post("/categories")
        .send({
            name: "Category supertest",
            description: "Description supertest"
        })
        .set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(400);
    });
});