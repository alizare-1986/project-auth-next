import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  console.log(hashedPassword);
  return hashedPassword;
}
async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    return {
      email: result.email,
    };
  } catch (err) {
    return false;
  }
}
export { hashPassword, verifyPassword, verifyToken };
