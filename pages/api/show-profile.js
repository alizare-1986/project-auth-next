import User from "../../models/User";
import connectDB from "../../utils/connectDB";
import {  verifyToken } from "../../utils/auth";

async function handler(req,res){
    if (req.method !== "GET") {
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
    
      res.status(200).json({status:"success",data:user})

}
export default handler