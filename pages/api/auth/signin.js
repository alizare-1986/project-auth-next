import { sign } from "jsonwebtoken";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import { serialize } from "cookie";
import connectDB from "../../../utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }
  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiretion = 24 * 60 * 60;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesnt exist" });
  }
  const isvalid = await verifyPassword(password, user.password);
  if (!isvalid) {
    return res
      .status(422)
      .json({ status: "failed", message: "username or password is incorrect" });
  }
  const token = sign({ email: email }, secretKey, { expiresIn: expiretion });
  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiretion,
    path: "/",
  });
  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({
      status: "success",
      message: "Log in",
      data: { email: user.email },
    });
}
export default handler;
