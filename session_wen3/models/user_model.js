const mongoose = require("mongoose");
const bcyptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0.0,
    },
    transactions: [
      {
        transType: String,
        amount: Number,
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const userData = this;
  if (userData.isModified("password"))
    userData.password = await bcyptjs.hash(userData.password, 10);
});

userSchema.statics.login = async (userName, password) => {
  const userData = await User.findOne({ userName });
  if (!userData) throw new Error("invalid userName");
  const matched = await bcyptjs.compare(password, userData.password);
  if (!matched) throw new Error("invalid password");
  return userData;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWTKEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
