const connectDB = async () => {
  const dbUrl = process.env.DB_URL;

  try {
    console.log("DB URL:", dbUrl); // Debugging: Log the DB URL
    const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB Connected");
    return client.db(); // Return the db object for further usage
  } catch (error) {
    console.log("DB connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;
