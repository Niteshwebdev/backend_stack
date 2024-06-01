const { MongoClient } = require("mongodb");
require('dotenv').config();

let dbInstance = null;

const connectDB = async (retries = 5, delay = 3000) => {
  if (dbInstance) {
    return dbInstance;
  }

  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error("Database URL not provided in environment variables");
  }

  for (let i = 0; i < retries; i++) {
    try {
      const client = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true,
        tlsCAFile: process.env.CA_FILE_PATH, // Optional: path to CA file if using self-signed certificates
      });

      dbInstance = client.db();
      console.log("DB Connected");
      return dbInstance;
    } catch (error) {
      console.error(`DB connection Error (attempt ${i + 1}):`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying connection in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw error;
      }
    }
  }
};

module.exports = connectDB;
