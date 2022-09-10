import { Router } from "express";
import { createCredential } from "../controllers/credentialController";
import { validateHeaderSchema } from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { tokenSchema } from "../schemas/tokenSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credential/create",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createCredential
);

export { credentialRouter };
