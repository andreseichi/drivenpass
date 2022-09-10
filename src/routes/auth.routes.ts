import { Router } from "express";
import { signup, signin } from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signup);
authRouter.post("/signin", validateSchema(signInSchema), signin);

export { authRouter };
