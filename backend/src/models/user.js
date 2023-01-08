import mongoose from "mongoose";
import bcrypt from "bcryptjs"

// schema 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,   
  },
  image: {
     type: String,
     trim: true,
   },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please fill your password confirm"],
    validate: {
      validator: function(el) {
        // "this" works only on create and save
        return el === this.password;
      },
      message: "Your password and confirmation password are not the same",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "supperadmin"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function(next) {
  // check the password if it is modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.correctPassword = async function( typedPassword, originalPassword,) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

// Virtual populate
userSchema.virtual('userContents', {
  ref: 'UserContent',
  foreignField: 'userId',
  localField: '_id'
});

const User = mongoose.model("User", userSchema);
export default User;
