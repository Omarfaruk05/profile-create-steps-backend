const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
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
                validator: (value)=> validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    nimNumber: 1,
                }),
                message: "Password is not strong enough."
            },
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function(value){
                    return value === this.password;
                },
                message: "password dosn't match."
            },
        },
        role: {
            type: String,
            enum: ['user', "admin"],
            default: "user",
        },
        firstName: {
            type: String,
            required: [true, "Please provide your first Name."],
            trim: true,
            minLength: [3, "First name must be at least 3 characters."],
            maxLength:[40, "First name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide your last Name"],
            trim: true,
            minLength: [3, "Last name must be at least 3 characters."],
            maxLength:[40, "Last name is too large"],
        },
        contactNumber: {
            type: String,
            validate: {
               validator:(value)=>{
                return validator.isMobilePhone(value);
               },
               message: "Please provide a valide phone number."
            },
        },
        imageUrl: {
            type: String,
            validate: [validator.isURL, "Please provide a valid image URL."]
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', function(next){
    const password = this.password;
    const hashPass = bcrypt.hashSync(password, 10);
    this.password = hashPass;
    this.confirmPassword = undefined;

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;