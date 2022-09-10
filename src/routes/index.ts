import { Router } from "express";

import { authRouter } from "./auth.routes";
import { credentialRouter } from "./credential.routes";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);

export default router;
