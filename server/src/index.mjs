import express from "express";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import cors from "cors";
import { LoginUser } from "./loginUser.mjs";
import { RegisterNewUser } from "./registerNewUser.mjs";
import { GetUser } from "./getUser.mjs";
import { AddTask, DeleteTask, GetTasks, UpdateTask } from "./Tasks.mjs";

const app = express();
const port = 4000;

// url to the arango database
const base_url = "http://arangodb:8529";

// enable cors allowing the frontend to access the backend
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "http://134.122.75.159", "http://134.122.75.159:3000"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "ToDoSession",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false, // Use secure cookies in production, non-secure in development
    httpOnly: true, // The cookie is only accessible by the server (prevents XSS attacks)
    sameSite: "lax", // Protect against CSRF attacks
    signed: true, // The cookie will be signed to prevent tampering
    overwrite: true, // Overwrite previous versions of the cookie
  })
);
// parse application/json
app.use(bodyParser.json());

app.get("/api/", (req, res) => {
  console.log("Session data:", req.session);
  res.send("Hello World! does this work?");
});
//########## End Session ##########
app.get("/api/end-session", (req, res) => {
  req.session = null;
  console.log("Session ended");
  
  res.send(JSON.stringify({ message: "Session ended" }));
});

//########## Register New User ##########
app.post("/api/validate-new-user", async (req, res) => {
  const register = await RegisterNewUser(req, res, base_url);
  if (register.alert) {
    return res.send(register);
  }
  console.log(register.id);
  req.session.user = register.id;
  console.log(req.session.user);
  res.send(register);
});

//########## Login User ##########
app.post("/api/login-user", async (req, res) => {
  const login = await LoginUser(req, res, base_url);
  if (login.alert) {
    return res.send(login);
  }
  console.log(login._key);
  req.session.user = login._key;
  console.log(req.session.user);
  res.send(login);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//########## Check Session ##########
app.get("/api/check-session", (req, res) => {
  if (req.session.user) {
    res.send(
      JSON.stringify({ message: "Active session", user: req.session.user })
    );
  } else {
    res.status(401).send(JSON.stringify({ message: "No active session" }));
  }
});

//########## Get User Data ##########
app.post("/api/get-user", async (req, res) => {
  const user = await GetUser(req, res, base_url);

  console.log("user", user);
  res.send(JSON.stringify(user));
});

//########## Add Task ##########
app.post("/api/add-task", async (req, res) => {
  //console.log('req', req.body)
  const newTask = await AddTask(req, res, base_url);
  res.send(JSON.stringify(newTask));
});

//########## GET Tasks ##########
app.post("/api/get-tasks", async (req, res) => {
  console.log("req", req.body);
  const tasks = await GetTasks(req, res, base_url);
  res.send(JSON.stringify(tasks));
});

//########## Update Task ##########

app.put("/api/update-task", async (req, res) => {
  console.log("req", req.body);
  const updateTask = await UpdateTask(req, res, base_url);
  console.log("updateTask", updateTask);
  res.send(JSON.stringify(updateTask));
});

//########## Delete Task ##########
app.delete("/api/delete-task", async (req, res) => {
  console.log("req", req.body);
  const newTask = await DeleteTask(req, res, base_url);
  res.send(JSON.stringify(newTask));
});
