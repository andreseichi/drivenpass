import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../types/users";

export function generateAccessToken(email: string) {
  return jwt.sign({ email }, String(process.env.JWT_ACESS_SECRET), {
    expiresIn: "15m",
  });
}

// export function generateRefreshToken(user: User, jti) {
//   return jwt.sign(
//     {
//       userId: user.id,
//       jti,
//     },
//     String(process.env.JWT_REFRESH_SECRET),
//     {
//       expiresIn: "8h",
//     }
//   );
// }

// export function generateTokens(user: User, jti) {
//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user, jti);

//   return {
//     accessToken,
//     refreshToken,
//   };
// }
