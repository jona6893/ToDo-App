import { db } from "./db.mjs";

async function AddTask(req, res, base_url) {
  const created_at = Math.round(Date.now() / 1000);
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
            INSERT {
                id: @key,
                title: @title,
                description: @description,
                status: @status,
                created_at:@created_at,
                updated_at:@created_at
            } INTO tasks
            RETURN NEW
            `,
    bindVars: {
      key: req.body.id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      created_at: created_at,
    },
  });

  return response.data.result[0];
}

async function GetTasks(req, res, base_url) {
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
      FOR task IN tasks
      FILTER task.id == @key
      LIMIT 25
      RETURN task
    `,
    bindVars: {
      key: req.body._key,
    },
  });

  return response.data.result;
}

async function DeleteTask(req, res, base_url) {
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
    FOR task IN tasks
    FILTER task._key == @key
    REMOVE { _key: task._key } IN tasks
    RETURN OLD
    `,
    bindVars: {
      key: req.body._key,
    },
  });

  console.log(response.data.result[0]);
  return response.data.result[0];
}


async function UpdateTask(req, res, base_url) {
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
    FOR task IN tasks
    FILTER task._key == @key
    UPDATE task WITH { ${Object.keys(req.body)
      .map((key) => `${key}: @${key}`)
      .join(", ")}, updated_at: DATE_NOW() } IN tasks
    RETURN NEW
    `,
    bindVars: {
      key: req.body._key,
      ...req.body,
    },
  });
  return response.data.result[0];
}




export { AddTask, GetTasks, DeleteTask, UpdateTask };
