import express from "express";
import cors from "cors";

import db from "./config/database.js";

import router from "./routes/routes.js";

const app = express();

app.use(express.json());
app.use(cors());

try {
  await db.authenticate();
  console.log("Connection established");
} catch (error) {
  console.error("Unable to connect");
}

app.use(router);

app.listen(5000, () => {
  console.log("Server running");
});
