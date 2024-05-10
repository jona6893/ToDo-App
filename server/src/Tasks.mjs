import { db } from "./db.mjs";

async function AddTask(req, res, base_url) {
  const response = await db.post(`${base_url}/_db/_system/_api/cursor`, {
    query: `
            INSERT {
                id: @key,
                title: @title,
                description: @description,
                status: @status
            } INTO tasks
            RETURN NEW
            `,
    bindVars: {
      key: req.body.id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
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

export { AddTask, GetTasks };
