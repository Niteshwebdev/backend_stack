


const connectDB=require("../database/db")


async function Addproductapi(req, res) {
    try{
        const db=await connectDB();
        const collection=db.collection("product")

        const {name,price,des}=req.body;
        const pimage = req.file.filename;


        await collection.insertOne({
            name,
            price,
            des,
            pimage
        }
            
        )

        return res.status(200).json({success: true, message: "product added successfulyy"})

    }
    catch(err){
        console.log(err)

        return res.status(500).json({success: false, message: "product not add"})
    }
  }

module.exports={Addproductapi}
