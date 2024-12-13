const express =  require("express");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true /*an index is a way to optimize the performance of database queries by creating a data structure that 
                    improves the speed of searching and retrieving data */,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary URl
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URl
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "PAssword is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// Define pre-save middleware for userSchema
userSchema.pre("save", async function (next) {
  // Check if the document has been modified (for example, if the password has been changed)
  if (!this.isModified()) return next(); // If the document is modified, skip further middleware and proceed with the save.

  // Hash the user's password before saving it to the database
  this.password = await bcrypt.hash(this.password, 10);
  // Call next() to continue with the save operation after the password is hashed
  next();
});

// Define a method `isPassword` on the schema that can be used by its instances
userSchema.methods.isPasswordCorrect = async function (password) {
  // Use the bcrypt library to compare the plain-text password provided (`password`)
  // with the hashed password stored in the database (`this.password`).
  // The `compare` method returns a boolean: `true` if they match, otherwise `false`.
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // Define a method named 'generateAccessToken' for the user schema.
  // This method is accessible on individual user instances (`this` refers to the instance).

  return jwt.sign(
    {
      // Use the `jwt.sign` method to create a JSON Web Token (JWT).
      // The first argument is the payload, which contains user-specific data.

      _id: this._id,
      // Include the user's unique ID (_id) in the token payload for identification.

      email: this.email,
      // Include the user's email address in the token payload, often used for verification or identification.

      username: this.username,
      // Include the user's username in the token payload.

      fullName: this.fullName,
      // Include the user's full name in the token payload, if needed for personalization or display purposes.
    },
    process.env.ACCESS_TOKEN_SECRET,
    // The second argument is the secret key used to sign the token.
    // This value should be stored securely in the environment variable `ACCESS_TOKEN_SECRET`.
    // It ensures that the token is valid and has not been tampered with.

    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      // The third argument is an options object.
      // The `expiresIn` property defines how long the token will be valid (e.g., '15m', '1h').
      // The `ACCESS_TOKEN_EXPIRY` constant must be defined elsewhere in the code.
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};
 const User = mongoose.model("User", userSchema);

 module.exports = User
