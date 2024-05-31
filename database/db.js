const { MongoClient } = require("mongodb");

const connectDB = async () => {
  const dbUrl =
    "mongodb+srv://mangodbms:vikaash123@vikashcluster.8nm3s.mongodb.net/ecommerce";
  try {
    const client = await MongoClient.connect(dbUrl);
    console.log("DB Connected");
    return client.db(); // Return the db object for further usage
  } catch (error) {
    console.log("DB connection Error: ", error);
    throw error;
  }
};
module.exports = connectDB;
