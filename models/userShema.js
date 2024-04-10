const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const JoiPhone = require("joi-phone-number");
const bcrypt = require("bcryptjs");

const userShema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: { 
      type: String, enum: ['user', 'admin'], default: 'user' 
    },
    cart: [{
       type: Schema.Types.ObjectId, ref: 'product'
       }], 
  favorites: [{ 
    type: Schema.Types.ObjectId, ref: 'product' 
  }],
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userShema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom method
userShema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = model("user", userShema);

const regJoiSchema = (data) =>
  Joi.object({
    name: Joi.string().max(16).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(6).max(30).required(),
  }).validate(data);

const loginJoiSchema = (data) =>
  Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(6).max(30).required(),
  }).validate(data);

const userPageJoiSchema = (data) =>
  Joi.object({
    name: Joi.string().max(16),
    email: Joi.string().min(4).max(255).email(),
    role: Joi.string().valid('user', 'admin').default('user'),
    cart: Joi.array().items(Joi.string()),
    favorites: Joi.array().items(Joi.string()), 
  }).validate(data);

/* const resendingJoiSchema = Joi.object({
  email: Joi.string().required().error(new Error("missing required field email")),
}); */

module.exports = {
  User,
  regJoiSchema,
  loginJoiSchema,
  userPageJoiSchema,
};
