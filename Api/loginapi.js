const { Timestamp } = require("mongodb");
const connectDB = require("../database/db");


async function Loginapi(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("user");

   const {email,password}=req.body;

   const userExist=collection.findOne({email,password})

   if(userExist){

 

       res.status(200).json({  message: "login successfully"})
   }

   else{
   


    res.status(400).json({message: "email is not registter"})
   }


  } catch (error) {
    console.error("login failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Login failed" });
  }
}

module.exports = { Loginapi };
