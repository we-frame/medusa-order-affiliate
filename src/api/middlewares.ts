import type { MiddlewaresConfig } from "@medusajs/medusa";
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import { raw } from "body-parser";

import express, { Request, Response, NextFunction } from "express";

const storeMiddleware = (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) => {
  // do something\
  console.log("======Custom Store Middleware Executed =========");
  next();
};

const rawBodyCapture = (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction,
) => {
  console.log(" ============ rawBodyCapture ========================");
  express.json({
    verify: (expressReq: Request, res: Response, buf: Buffer) => {
      console.log(expressReq.originalUrl);
      if (expressReq.originalUrl.includes("/store/webhook")) {
        expressReq.rawBody = buf.toString();
        req.rawBody = buf.toString();
      }
    }
  })
  next();
};

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/store/dashboard/*",
      middlewares: [storeMiddleware],
    },
    {
      matcher: "/store/webhook",
      bodyParser: false,
      middlewares: [raw({ type: "application/json" })],
    },
  ],
};
