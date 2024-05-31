const multer = require("multer");
const path = require("path");




const storage = multer.diskStorage({
  // Path to store the profilePic
  destination: (req, file, cb) => {
    // Use path.join to create an absolute path
    const uploadPath = path.join(__dirname, "../images/product");
    cb(null, uploadPath);
  },

  // Filename to give to the profilePic
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the storage configuration
const profilepicupload = multer({ storage: storage });
const addproductupload = multer({ storage: storage });
const updateproductupload=multer({ storage: storage});

module.exports = { profilepicupload, addproductupload, updateproductupload };