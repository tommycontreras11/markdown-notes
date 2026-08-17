import express from "express";
import cors from "cors";
import { initFile } from "./helper/file.js";
import routes from "./routes/index.js";

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  }),
);

app.use(express.json());
app.use(routes);

await initFile();

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
