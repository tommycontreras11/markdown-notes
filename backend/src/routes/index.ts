import { Router } from "express";
import rootRoutes from "./root/index.js"
import apiRoutes from "./api/index.js"

const router = Router()

router.use("/", rootRoutes)
router.use("/api", apiRoutes)

export default router