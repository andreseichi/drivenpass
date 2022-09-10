import { Router } from "express";

import { authRouter } from "./auth.routes";
import { cardRouter } from "./card.routes";
import { credentialRouter } from "./credential.routes";
import { secureNoteRouter } from "./secureNote.routes";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);
router.use(cardRouter);

export default router;
