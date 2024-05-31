const { Timestamp } = require("mongodb");
const connectDB = require("../database/db");

async function Signupapi(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("user");

    const { email, phone, password , role,} = req.body;
    const profilePic=req.file;

    if ( !email || !phone  || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields!" });
    }

    const userExist = await collection.findOne({ email });
    console.log("UserExist:", userExist);

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already Exist!" });
    }

    // Create a unique index on the email field if it doesn't already exist
    await collection.createIndex(
      { email: 1 },
      { unique: true, required: true }
    );

    const user = await collection.insertOne({
     
      email,
      phone,
      password,
      role,
      profilePic
    });

    return res
      .status(200)
      .json({ success: true, message: "Registration Successful" });
  } catch (error) {
    console.error("Registration Failed:", error);
    return res
      .status(500)
      .json({ success: false, error: "Registration Failed" });
  }
}

module.exports = { Signupapi };
