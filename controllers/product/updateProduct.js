const { Product } = require("../../models");
const createHttpError = require("http-errors");
const { catchAsync } = require("../../utils");

const updateProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  if (Object.keys(productData).length === 0)
    return next(createHttpError.NotFound("missing fields"));

  const { id } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select(" -updatedAt -createdAt");

  res.status(200).json({
    product: updatedProduct,
  });
});

module.exports = updateProduct;
