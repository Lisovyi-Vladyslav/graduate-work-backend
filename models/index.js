const { User } = require("./userShema");
const { regJoiSchema } = require("./userShema");
const { loginJoiSchema } = require("./userShema");
const { userPageJoiSchema } = require("./userShema");

const { Product } = require("./productShema");
const { productJoiSchema } = require("./productShema");

module.exports = {
  User,
  regJoiSchema,
  loginJoiSchema,
  userPageJoiSchema,
  Product,
  productJoiSchema,
};
