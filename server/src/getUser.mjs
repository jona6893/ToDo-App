import { db } from "./db.mjs";


export async function GetUser(req, res, base_url) {
    const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
        query: `
            FOR user IN users
            FILTER user._key == @id
            LET tasks = (
                FOR task IN tasks
                FILTER task._key == user._key
                LIMIT 25
                RETURN task
            )
            RETURN { email: user.email, _key: user._key, tasks: tasks }
            `,
        bindVars: { id: req.session.user },
    });
    return response.data.result[0];

}

