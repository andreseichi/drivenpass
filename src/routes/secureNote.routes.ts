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
  "/securenote/create",
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
  "/securenote/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getSecureNote
);

secureNoteRouter.delete(
  "/securenote/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  deleteSecureNote
);

export { secureNoteRouter };
