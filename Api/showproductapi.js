const { message } = require("statuses");
const connectDB=require("../database/db");


async function Showproductapi(req,res){
    try {
        // Connect to MongoDB
        const db = await connectDB();
        const collection = db.collection('product');
    
        // Fetch product data from MongoDB
        const products = await collection.find({}).toArray();
    
        console.log(products)
        // Check if products exist
        if (products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
    
      
    
        // Send products as JSON response
        res.status(200).json(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports={Showproductapi}