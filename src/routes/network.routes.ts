import { Router } from "express";
import {
  createNetwork,
  deleteNetwork,
  getNetwork,
  getUserNetworks,
} from "../controllers/networkController";

import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { networkSchema } from "../schemas/networkSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const networkRouter = Router();

networkRouter.post(
  "/network/create",
  validateSchema(networkSchema),
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createNetwork
);

networkRouter.get(
  "/networks",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getUserNetworks
);

networkRouter.get(
  "/network/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getNetwork
);

networkRouter.delete(
  "/network/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  deleteNetwork
);

export { networkRouter };
