import { verifyToken } from "../../utils/auth";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res.status(401).json({status:"failed",message:"You are not SignUp"})
  }
  const result =verifyToken(token,secretKey)
  if(result){
    res.status(200).json({status:"success",data:result})
  }else{
    res.status(401).json({status:"failed",message:"You are unauthorized"})
  }
}
export default handler;
