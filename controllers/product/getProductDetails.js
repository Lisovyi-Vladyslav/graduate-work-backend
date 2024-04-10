const { Product } = require("../../models");

const { catchAsync } = require("../../utils");

const getProductDetails = catchAsync(async (req, res, next) => {
  // const { _id } = req.user;
  
  // const tasks = await Task.find({ owner: _id }).select(
  //   "-owner -updatedAt -createdAt"
  // );

  // // const tasks = await Product.find({
  // //   $and: [
  // //     { owner: _id },
  // //     {
  // //       $expr:
  // //         {
  // //         $and: [
  // //             { $eq: [{ $year: "$date" }, year] },
  // //             { $eq: [{ $month: "$date" }, month] }
  // //          ]
  // //       }
  // //     }
  // //   ]
  // // }).select(
  // //   "-owner -updatedAt -createdAt"
  // // );
  const { id } = req.params;


  
  const productsDetails = await Product.findById(id).select(
      " -updatedAt -createdAt"
    );

  res.status(200).json({
    product: productsDetails,
  });
});

module.exports = getProductDetails;
