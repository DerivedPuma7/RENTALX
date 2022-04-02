import { getConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const passwordHash = await hash("admin", 8);

    await connection.query(
        `INSERT INTO 
            USERS(id, name, email, password, "isAdmin", created_at, driver_license) 
            VALUES('${id}', 'Gustavo admin', 'admin@admin.com.br', '${passwordHash}', true, 'now()', 'XXXXXX-XX')
        `
    );

    await connection.close;
}

create().then(() => console.log("user admin created"));