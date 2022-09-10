import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCard,
  getUserCards,
} from "../controllers/cardController";

import {
  validateHeaderSchema,
  validateSchema,
} from "../middlewares/schemaMiddleware";
import { isAuthenticated } from "../middlewares/tokenMiddleware";
import { cardSchema } from "../schemas/cardSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/create",
  validateSchema(cardSchema),
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  createCard
);

cardRouter.get(
  "/cards",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getUserCards
);

cardRouter.get(
  "/card/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  getCard
);

cardRouter.delete(
  "/card/:id",
  validateHeaderSchema(tokenSchema),
  isAuthenticated,
  deleteCard
);

export { cardRouter };
