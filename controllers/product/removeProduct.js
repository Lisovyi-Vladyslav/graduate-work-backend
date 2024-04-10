const createHttpError = require("http-errors");
const { Product } = require("../../models");
const { catchAsync } = require("../../utils");

const removeProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const removedProduct = await Product.findByIdAndRemove(id);
  console.log(removedProduct);

  res.status(200).json({
    product: removedProduct,
  });
});

module.exports = removeProduct;
