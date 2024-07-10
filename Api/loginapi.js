const connectDB = require("../database/db");

async function Loginapi(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("user");

    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Await the findOne query
    const userExist = await collection.findOne({ email, password });

    if (userExist) {
      res.status(200).json({ message: "Login successfully" });
    } else {
      res.status(400).json({ message: "Email is not registered" });
    }

  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ success: false, error: "Login failed" });
  }
}

module.exports = { Loginapi };
