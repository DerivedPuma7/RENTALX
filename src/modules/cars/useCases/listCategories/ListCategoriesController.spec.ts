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

    it("should be able to list all categories", async () => {
        const authResponse = await request(app)
        .post("/sessions")
        .send({
            email: "admin@admin.com.br",
            password: "admin"
        });

        const { token } = authResponse.body;
        const auth = {
            Authorization: `Bearer ${token}`
        }
        
        await request(app)
        .post("/categories")
        .send({
            name: "Category supertest",
            description: "Description supertest"
        })
        .set(auth);

        const response = await request(app)
        .get('/categories')
        .set(auth);

        expect(response.status).toBe(201);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
    });

});