const { Product } = require("../../models");
const { catchAsync } = require("../../utils");

const addProduct = catchAsync(async (req, res, next) => {
console.log('--------------------------------------------')

  const newProductData = {
    ...req.body,
    // owner: req.user._id,
  };

  console.log('=------------------------------')
  console.log('first')
  console.log(req.body)

  const newProduct = await Product.create(newProductData)

  res.status(201).json({
    product: newProduct,
  });
});

module.exports = addProduct;
