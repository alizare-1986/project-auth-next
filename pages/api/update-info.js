import { verifyPassword, verifyToken } from "../../utils/auth";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";

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
  const { name, lastName, phone, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not SignUp" });
  }
  const result = verifyToken(token, secretKey);
  if (!result) {
    res.status(401).json({ status: "failed", message: "You are unauthorized" });
  }
  const user = await User.findOne({ email: result.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist! " });
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "failed", message: " password is incorrect" });
  }
  user.name = name;
  user.lastName = lastName;
  user.phone = phone;
  user.save();
  res
    .status(200)
    .json({
      status: "success",
      data: { name, lastName, phone, email: result.email },
    });
}
export default handler;
