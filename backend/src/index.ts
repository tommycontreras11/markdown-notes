import express from "express";
import { initFile } from "./helper/file.js";
import routes from "./routes/index.js"

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(routes)

await initFile();

app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`));
