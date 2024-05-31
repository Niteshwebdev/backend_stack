const connectDB = require("../database/db");
const { ObjectId } = require("mongodb");

async function Deleteproduct(req,res){

    try{

        const db = await connectDB();
        const collection = db.collection("product");

        const {uId}=req.body;

        const result=await collection.deleteOne({
            _id: ObjectId.createFromHexString(uId)
         })

        return res.status(200).json({message: "product deleted "})
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports={Deleteproduct}