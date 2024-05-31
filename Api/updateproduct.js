const connectDB = require("../database/db");
const { ObjectId } = require("mongodb");

async function Updateproduct(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("product");

        const { uid, name, price, des } = req.body;
        const pimage = req.file ? req.file.filename : null; // Assuming req.file contains the file info

        // Validate ObjectId
        if (!ObjectId.isValid(uid)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        // Ensure required fields are provided
        if (!name || !price || !des) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updateFields = {
            name: name,
            price: price,
            des: des,
        };

        if (pimage) {
            updateFields.pimage = pimage;
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(uid) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { Updateproduct };
