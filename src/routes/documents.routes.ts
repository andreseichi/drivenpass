import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  getDocument,
  getUserDocuments,
} from "../controllers/documentController";

import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { documentSchema } from "../schemas/documentSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const documentRouter = Router();

documentRouter.post(
  "/document/create",
  validateSchema(documentSchema),
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createDocument
);

documentRouter.get(
  "/documents",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getUserDocuments
);

documentRouter.get(
  "/document/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getDocument
);

documentRouter.delete(
  "/document/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  deleteDocument
);

export { documentRouter };
