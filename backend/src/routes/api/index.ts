import { Router } from "express";
import noteRouter from "./note/index.js"

const router = Router()

router.use("/notes", noteRouter)

export default router