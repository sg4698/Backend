// Importing the "multer" package for handling file uploads
const multer = require("multer");

// Define the storage configuration for uploaded files
const storage = multer.diskStorage({
  // Specifies the folder where files will be saved
  destination: function (req, file, cb) {
    // `req` - The request object
    // `file` - Information about the uploaded file
    // `cb` - A callback function to specify the destination folder
    cb(null, "/public/temp"); // Save the file in the "/public/temp" directory
  },
  // Specifies the name for the saved file
  filename: function (req, file, cb) {
    // `file.originalname` contains the original name of the uploaded file
    cb(null, file.originalname); // Save the file with its original name
  },
});

// Export the configured Multer instance
export const upload = multer({
  storage, // Use the custom `storage` configuration defined above
});
