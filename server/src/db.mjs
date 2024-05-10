import axios from "axios";
import http from "http";
// create a connection to the arango database
const db = axios.create({
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
  httpAgent: new http.Agent({ keepAlive: true }),
});

export { db };
