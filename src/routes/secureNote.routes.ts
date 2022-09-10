import { Router } from "express";
import {
  createSecureNote,
  deleteSecureNote,
  getSecureNote,
  getUserSecureNotes,
} from "../controllers/secureNoteController";
import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { secureNoteSchema } from "../schemas/secureNoteSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const secureNoteRouter = Router();

secureNoteRouter.post(
  "/securenotes/create",
  validateSchema(secureNoteSchema),
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createSecureNote
);

secureNoteRouter.get(
  "/securenotes",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getUserSecureNotes
);

secureNoteRouter.get(
  "/securenotes/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getSecureNote
);

secureNoteRouter.delete(
  "/securenotes/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  deleteSecureNote
);

export { secureNoteRouter };
