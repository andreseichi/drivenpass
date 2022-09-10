import { Router } from "express";

import { authRouter } from "./auth.routes";
import { credentialRouter } from "./credential.routes";
import { secureNoteRouter } from "./secureNote.routes";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(secureNoteRouter);

export default router;
