import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateDto =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    const errors = result.error?.flatten();

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: {
          fields: errors?.fieldErrors,
        },
      });
    }

    req.body = result.data;
    next();
  };
