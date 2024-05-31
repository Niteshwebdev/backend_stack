const express = require("express");
const cors = require("cors");
const path = require("path");

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
const PORT = 4000;

// Secret key generation
// const secretKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// if (!process.env.SESSION_SECRET) {
//   process.env.SESSION_SECRET = secretKey;
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.static(path.join(__dirname,'../frontend/build')))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }, // Set 'secure: true' if using HTTPS
// }));

app.use('/images/product', express.static(path.join(__dirname, 'images/product')));

app.post("/signupapi", profilepicupload.single('profilePic'), Signupapi);
app.post("/addproductapi", addproductupload.single('pimage'), Addproductapi);
app.get("/showproductapi", Showproductapi);
app.post("/updateproduct", updateproductupload.single("pimage"), Updateproduct);
app.post("/deleteproduct", Deleteproduct);
app.post("/loginapi", Loginapi);
// app.post("/logoutapi", Logoutapi);
// app.post("/session", Session);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
