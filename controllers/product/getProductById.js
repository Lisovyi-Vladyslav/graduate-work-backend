const { Product } = require("../../models");

const { catchAsync } = require("../../utils");

const getProductById = catchAsync(async (req, res, next) => {
  const ids = req.body;
  // console.log('sdfgh')
  // console.log(req)
  

  const getProductById = await Product.find({ _id: { $in: ids } }).select(
      " -updatedAt -createdAt"
    );

    console.log(getProductById)

  res.status(200).json({
    product: getProductById,
  });
});

module.exports = getProductById;
