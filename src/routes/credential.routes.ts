import { Router } from "express";
import {
  createCredential,
  getCredential,
  getUserCredentials,
} from "../controllers/credentialController";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credential/create",
  validateSchema(credentialSchema),
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createCredential
);

credentialRouter.get(
  "/credentials",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getUserCredentials
);

credentialRouter.get(
  "/credentials/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getCredential
);

export { credentialRouter };
