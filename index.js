const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config(); // Load environment variables

const connectDB = require("./database/db");
const { Signupapi } = require("./Api/signupapi");
const { profilepicupload, addproductupload, updateproductupload } = require("./multer/multerUpload");
const { Addproductapi } = require("./Api/addproductapi");
const { Showproductapi } = require("./Api/showproductapi");
const { Updateproduct } = require("./Api/updateproduct");
const { Deleteproduct } = require("./Api/deleteproduct");
const { Loginapi } = require("./Api/loginapi");
// const { Session } = require("./Api/session");
// const { Logoutapi } = require("./Api/logoutapi");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/images/product', express.static(path.join(__dirname, 'images/product')));

// API routes
app.post("/signupapi", profilepicupload.single('profilePic'), Signupapi);
app.post("/addproductapi", addproductupload.single('pimage'), Addproductapi);
app.get("/showproductapi", Showproductapi);
app.post("/updateproduct", updateproductupload.single("pimage"), Updateproduct);
app.post("/deleteproduct", Deleteproduct);
app.post("/loginapi", Loginapi);
// app.post("/logoutapi", Logoutapi);
// app.post("/session", Session);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server after DB connection is established
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("Failed to connect to the database. Server not started.");
  process.exit(1);
});
