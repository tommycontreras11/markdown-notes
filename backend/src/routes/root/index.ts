import { Router, Request, Response } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({ healthy: true });
});

export default router;
