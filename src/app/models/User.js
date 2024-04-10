const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your first Name."],
      trim: true,
      minLength: [3, "First name must be at least 3 characters."],
      maxLength: [40, "First name is too large"],
    },
    userName: {
      type: String,
      required: [true, "Please provide your first Name."],
      trim: true,
      unique: true,
      minLength: [3, "First name must be at least 3 characters."],
      maxLength: [40, "First name is too large"],
    },
    email: {
      type: String,
      requited: [true, "Email is required"],
      unique: [true, "Your email is already used."],
      validator: [validator.email, "Please provide a valid email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
          }),
        message: "Password is not strong enough.",
      },
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please provide a valid image URL."],
    },
    address: {
      type: String,
    },
    role: {
      type: [String],
      enum: ["designer", "recruiter", "student"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashPass = bcrypt.hashSync(password, 10);
  this.password = hashPass;
  this.confirmPassword = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
